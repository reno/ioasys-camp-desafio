import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import { File } from '@shared/entities/file/file.entity';
import envVariables from '@config/env';
import { FileRepository } from './repository/file.repository';

 
@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(FileRepository)
    private readonly fileRepository: FileRepository,
  ) {}
 
  async upload(dataBuffer: Buffer, filename: string) {
    const s3 = new S3();
    const uploadResult = await s3.upload({
      Bucket: envVariables().awsBucketName,
      Body: dataBuffer,
      Key: `${uuid()}-${filename}`
    }).promise();
    
    const newFile = this.fileRepository.create({
      key: uploadResult.Key,
      url: uploadResult.Location
    });
    await this.fileRepository.save(newFile);
    return newFile;
  }
}