import { Module } from '@nestjs/common';
import { UploadModule } from './upload/upload.module';
import { ConfirmModule } from './confirm/confirm.module';
import { ListModule } from './list/list.module';
import { ConfigModule } from '@nestjs/config';
import geminiConfig from './config/server.config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [geminiConfig],
    }),
    MongooseModule.forRoot(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/nest',
    ),
    UploadModule,
    ConfirmModule,
    ListModule,
  ],
})
export class AppModule {}
