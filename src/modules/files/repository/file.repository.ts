import { File } from "@shared/entities/file/file.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(File)
export class FileRepository extends Repository<File> {}