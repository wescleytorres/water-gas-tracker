import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class ConfirmDto {
  @IsString()
  @IsNotEmpty()
  measure_uuid: string;

  @IsInt()
  confirmed_value: number;
}
