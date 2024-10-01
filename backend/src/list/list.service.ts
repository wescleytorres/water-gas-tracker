import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { ListRepository } from './list.repository';
import { ListDto, MeasureType } from './list.dto';

@Injectable()
export class ListService {
  constructor(private listRepository: ListRepository) {}

  async getMeasures(listDto: ListDto) {
    const { customer_code, measure_type } = listDto;

    if (measure_type && !Object.values(MeasureType).includes(measure_type)) {
      throw new BadRequestException({
        error_code: 'INVALID_TYPE',
        error_description: 'Tipo de medição não permitida',
      });
    }

    const measures = await this.listRepository.findByCustomerCode(
      customer_code,
      measure_type,
    );

    if (measures.length === 0) {
      throw new NotFoundException({
        error_code: 'MEASURES_NOT_FOUND',
        error_description: 'Nenhuma leitura encontrada',
      });
    }

    return {
      customer_code,
      measures: measures.map((measure) => ({
        measure_uuid: measure.measure_id,
        measure_datetime: measure.measure_datetime,
        measure_type: measure.measure_type,
        has_confirmed: measure.measure_value !== null,
        image_url: measure.image_url,
      })),
    };
  }
}
