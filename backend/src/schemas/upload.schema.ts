import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { randomUUID as uuidv4 } from 'node:crypto';

export type UploadDocument = Upload & Document;

@Schema()
export class Upload extends Document {
  @Prop({ required: true })
  customer_code: string;

  @Prop({ required: true, unique: true, type: String, default: () => uuidv4() })
  measure_id: string;

  @Prop({ required: true })
  measure_datetime: Date;

  @Prop({ required: true })
  measure_type: string;

  @Prop({ required: true })
  measure_value: number;

  @Prop({ required: true })
  image_url: string;
}

export const UploadSchema = SchemaFactory.createForClass(Upload);
