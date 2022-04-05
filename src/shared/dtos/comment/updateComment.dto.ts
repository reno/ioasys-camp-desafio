import { PartialType } from "@nestjs/mapped-types";
import { CreateCommentDTO } from "@shared/dtos/comment/createComment.dto";

export class UpdateCommentDTO extends PartialType(CreateCommentDTO) {}