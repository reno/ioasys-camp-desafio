import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { instanceToInstance } from 'class-transformer';
import { BusinessTypeService } from '@modules/business_types/businessType.service';

@ApiTags('Business Type')
@Controller('business-type')
export class BusinessTypeController {
  constructor(private readonly businessTypeService: BusinessTypeService) {}

  @Get()
  async findAll() {
    const businessTypes = await this.businessTypeService.findAll();
    return businessTypes.map(businessType => instanceToInstance(businessType));
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const businessType = await this.businessTypeService.findOne(id);
    return instanceToInstance(businessType);
  }
}
