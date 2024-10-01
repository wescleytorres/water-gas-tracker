import { Controller, Post, Body, Get, HttpCode } from '@nestjs/common';
import { UploadDto } from './upload.dto';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Get()
  async getUploads() {
    return this.uploadService.findAll();
  }

  @Post()
  @HttpCode(200)
  async uploadFile(@Body() uploadDto: UploadDto) {
    return this.uploadService.create(uploadDto);
  }
}
