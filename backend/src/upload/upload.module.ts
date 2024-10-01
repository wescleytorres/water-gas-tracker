import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UploadSchema } from '../schemas/upload.schema';
import { UploadRepository } from './upload.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Upload', schema: UploadSchema }]),
  ],
  controllers: [UploadController],
  providers: [UploadService, ConfigService, UploadRepository],
})
export class UploadModule {}
