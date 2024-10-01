import { ConflictException, Injectable, OnModuleInit } from '@nestjs/common';
import { UploadDto } from './upload.dto';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs/promises';
import * as path from 'path';
import { UploadRepository } from './upload.repository';
import { saveImageLocally } from 'src/config/utils';

@Injectable()
export class UploadService implements OnModuleInit {
  private genAiModel: string;

  constructor(
    private uploadRepository: UploadRepository,
    private configService: ConfigService,
  ) {
    this.genAiModel = this.configService.get<string>('GEMINI_API_KEY');
  }

  async findAll() {
    return this.uploadRepository.findAll();
  }

  async onModuleInit() {
    const dir = path.join(__dirname, '..', '..', 'uploads');
    try {
      await fs.mkdir(dir, { recursive: true });
    } catch (error) {
      console.error('Error creating uploads directory:', error);
    }
  }

  async create(uploadDto: UploadDto) {
    const genAi = new GoogleGenerativeAI(this.genAiModel);
    const model = genAi.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const existingUpload = await this.uploadRepository.findByMonthAndType(
      uploadDto.measure_type,
      uploadDto.measure_datetime,
    );

    if (existingUpload) {
      throw new ConflictException({
        error_code: 'DOUBLE_REPORT',
        error_description: 'Leitura do mês já realizada',
      });
    }

    const prompt = `
      You are an expert in water consumption analysis. 
      You will be provided with a picture of a water meter and gas meter, 
      and you need to extract the consumption reading from the image.
      return only the value.
      `;

    const imagePart = {
      inlineData: {
        data: uploadDto.image,
        mimeType: 'image/jpg',
      },
    };

    const localImageUrl = await saveImageLocally(uploadDto.image);

    const responseMeasureValue = await model.generateContent([
      prompt,
      imagePart,
    ]);

    const uploadData = {
      customer_code: uploadDto.customer_code,
      measure_datetime: new Date(uploadDto.measure_datetime),
      measure_type: uploadDto.measure_type,
      measure_value: +responseMeasureValue.response.text(),
      image_url: localImageUrl,
    };

    return this.uploadRepository.create(uploadData);
  }
}
