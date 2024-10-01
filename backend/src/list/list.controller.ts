import { Controller, Get, Param, Query } from '@nestjs/common';
import { ListService } from './list.service';
import { ListDto, MeasureType } from './list.dto';

@Controller(':customer_code/list')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Get()
  async getMeasures(
    @Param('customer_code') customer_code: string,
    @Query('measure_type') measure_type?: MeasureType,
  ) {
    const listDto: ListDto = { customer_code, measure_type };
    return this.listService.getMeasures(listDto);
  }
}
