import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Upload, UploadDocument } from '../schemas/upload.schema';

@Injectable()
export class UploadRepository {
  constructor(
    @InjectModel(Upload.name) private uploadModel: Model<UploadDocument>,
  ) {}

  async create(uploadData: Partial<Upload>): Promise<Partial<Upload>> {
    const newUpload = new this.uploadModel(uploadData);
    const savedUpload = await newUpload.save();

    return {
      image_url: savedUpload.image_url,
      measure_value: savedUpload.measure_value,
      measure_id: savedUpload.measure_id,
    };
  }

  async findAll(): Promise<Upload[]> {
    return this.uploadModel.find().exec();
  }

  async findById(id: string): Promise<Upload | null> {
    return this.uploadModel.findById(id).exec();
  }

  async update(
    id: string,
    uploadData: Partial<Upload>,
  ): Promise<Upload | null> {
    return this.uploadModel
      .findByIdAndUpdate(id, uploadData, { new: true })
      .exec();
  }

  async delete(id: string): Promise<Upload | null> {
    return this.uploadModel.findByIdAndDelete(id).exec();
  }

  async findByMonthAndType(
    measureType: string,
    measureDatetime: string,
  ): Promise<Upload | null> {
    const startOfMonth = new Date(measureDatetime);
    startOfMonth.setDate(1);
    const endOfMonth = new Date(startOfMonth);
    endOfMonth.setMonth(endOfMonth.getMonth() + 1);

    return this.uploadModel
      .findOne({
        measure_type: measureType,
        measure_datetime: {
          $gte: startOfMonth,
          $lt: endOfMonth,
        },
      })
      .exec();
  }
}
