import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessTypeRepository } from '@modules/business_types/repository/businessType.repository';
import { BusinessTypeController } from './businessType.controller';
import { BusinessTypeService } from './businessType.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ BusinessTypeRepository ]),
  ],
  controllers: [BusinessTypeController],
  providers: [BusinessTypeService]
})
export class BusinessTypeModule {}
