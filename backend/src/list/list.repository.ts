import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Upload, UploadDocument } from '../schemas/upload.schema';

@Injectable()
export class ListRepository {
  constructor(
    @InjectModel(Upload.name) private uploadModel: Model<UploadDocument>,
  ) {}

  async findByCustomerCode(
    customer_code: string,
    measure_type?: string,
  ): Promise<Upload[]> {
    const query: any = { customer_code };

    if (measure_type) {
      query.measure_type = { $regex: new RegExp(`^${measure_type}$`, 'i') };
    }

    return this.uploadModel.find(query).exec();
  }
}
