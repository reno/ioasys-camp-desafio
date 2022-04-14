import { BusinessType } from "@shared/entities/business_type/businessType.entity";
import { EntityRepository, Repository } from "typeorm";


@EntityRepository(BusinessType)
export class BusinessTypeRepository extends Repository<BusinessType> {}