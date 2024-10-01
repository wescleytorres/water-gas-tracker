import { Controller, Patch, Body } from '@nestjs/common';
import { ConfirmDto } from './confirm.dto';
import { ConfirmService } from './confirm.service';

@Controller('confirm')
export class ConfirmController {
  constructor(private readonly confirmService: ConfirmService) {}

  @Patch()
  async confirmValue(@Body() confirmDto: ConfirmDto) {
    return this.confirmService.confirmValue(confirmDto);
  }
}
