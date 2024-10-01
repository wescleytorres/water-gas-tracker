import {
  IsBase64,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export enum MeasureType {
  WATER = 'WATER',
  GAS = 'GAS',
}

export class UploadDto {
  @IsBase64()
  @IsNotEmpty()
  image: string;

  @IsString()
  @IsNotEmpty()
  customer_code: string;

  @IsDateString()
  measure_datetime: string;

  @IsEnum(MeasureType)
  measure_type: MeasureType;
}
