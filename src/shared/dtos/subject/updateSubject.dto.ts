import { PartialType } from "@nestjs/mapped-types";
import { CreateSubjectDTO } from "@shared/dtos/subject/createSubject.dto";

export class UpdateSubjectDTO extends PartialType(CreateSubjectDTO) {}