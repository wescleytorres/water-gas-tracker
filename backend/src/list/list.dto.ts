import { IsOptional, IsEnum, IsString } from 'class-validator';

export enum MeasureType {
  WATER = 'WATER',
  GAS = 'GAS',
}

export class ListDto {
  @IsString()
  customer_code: string;

  @IsOptional()
  @IsEnum(MeasureType)
  measure_type?: MeasureType;
}
