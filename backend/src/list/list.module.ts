import { Module } from '@nestjs/common';
import { ListController } from './list.controller';
import { ListService } from './list.service';
import { ListRepository } from './list.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { UploadSchema } from '../schemas/upload.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Upload', schema: UploadSchema }]),
  ],
  controllers: [ListController],
  providers: [ListService, ListRepository],
})
export class ListModule {}
