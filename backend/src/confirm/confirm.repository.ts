import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Upload, UploadDocument } from '../schemas/upload.schema';

@Injectable()
export class ConfirmRepository {
  constructor(
    @InjectModel(Upload.name) private uploadModel: Model<UploadDocument>,
  ) {}

  async findById(measure_uuid: string): Promise<Upload | null> {
    return this.uploadModel.findOne({ measure_id: measure_uuid }).exec();
  }

  async updateConfirmedValue(
    measure_uuid: string,
    confirmed_value: number,
  ): Promise<Upload | null> {
    return this.uploadModel
      .findOneAndUpdate(
        { measure_id: measure_uuid },
        { measure_value: confirmed_value },
        { new: true },
      )
      .exec();
  }
}
