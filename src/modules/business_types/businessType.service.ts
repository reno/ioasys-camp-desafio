import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessTypeRepository } from '@modules/business_types/repository/businessType.repository';

@Injectable()
export class BusinessTypeService {
  constructor(
    @InjectRepository(BusinessTypeRepository)
    private readonly businessTypeRepository: BusinessTypeRepository,
) {}

async findAll() {
    return await this.businessTypeRepository.find();
  }

async findOne(id: string) {
    return await this.businessTypeRepository.findOne(id);
  }
}
