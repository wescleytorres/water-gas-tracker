import { Module } from '@nestjs/common';
import { ConfirmController } from './confirm.controller';
import { ConfirmService } from './confirm.service';
import { ConfirmRepository } from './confirm.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { UploadSchema } from '../schemas/upload.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Upload', schema: UploadSchema }]),
  ],
  controllers: [ConfirmController],
  providers: [ConfirmService, ConfirmRepository],
})
export class ConfirmModule {}
