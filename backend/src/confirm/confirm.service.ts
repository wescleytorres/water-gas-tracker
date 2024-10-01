import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { ConfirmDto } from './confirm.dto';
import { ConfirmRepository } from './confirm.repository';

@Injectable()
export class ConfirmService {
  constructor(private confirmRepository: ConfirmRepository) {}

  async confirmValue(confirmDto: ConfirmDto) {
    const existingUpload = await this.confirmRepository.findById(
      confirmDto.measure_uuid,
    );

    if (!existingUpload) {
      throw new NotFoundException('Leitura não encontrada');
    }

    if (existingUpload.measure_value === confirmDto.confirmed_value) {
      throw new ConflictException('Leitura já confirmada');
    }

    await this.confirmRepository.updateConfirmedValue(
      confirmDto.measure_uuid,
      confirmDto.confirmed_value,
    );
    return { success: true };
  }
}
