import { PartialType } from "@nestjs/mapped-types";
import { CreateThreadDTO } from "@shared/dtos/thread/createThread.dto";

export class UpdateThreadDTO extends PartialType(CreateThreadDTO) {}