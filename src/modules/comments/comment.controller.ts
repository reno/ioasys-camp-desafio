import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { instanceToInstance } from 'class-transformer';
import { UserFromRequest } from '@shared/decorators/user.decorator';
import { User } from '@shared/entities/user/user.entity';
import { CommentService } from '@modules/comments/comment.service'; 
import { CreateCommentDTO } from '@shared/dtos/comment/createComment.dto';
import { Comment } from '@shared/entities/comment/comment.entity';
import { CommentAuthorGuard } from '@shared/guards/commentAuthor.guard';
import { UpdateCommentDTO } from '@shared/dtos/comment/updateComment.dto';

@ApiTags('Comments')
@Controller('comments')
@UseInterceptors(ClassSerializerInterceptor)
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get(':id')
  public async findOne(@Param('id') id: string): Promise<Comment> {
    const comment = await this.commentService.findById(id);
    return instanceToInstance(comment);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ type: Comment })
  @UseGuards(AuthGuard('jwt'))
  public async create(@UserFromRequest() user: User, @Body() createCommentDTO: CreateCommentDTO) {
    const thread = await this.commentService.create(user.id, createCommentDTO);
    return instanceToInstance(thread);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), CommentAuthorGuard)
  async update(@Param('id') id: string, @Body() updateCommentDTO: UpdateCommentDTO,){
    const comment = await this.commentService.update(id, updateCommentDTO);
    return instanceToInstance(comment);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), CommentAuthorGuard)
  async delete(@Param('id') id: string) {
    const comment = await this.commentService.remove(id);
    return instanceToInstance(comment);
  }
}