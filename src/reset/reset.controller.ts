import { Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { ResetService } from './reset.service';

@Controller('reset')
export class ResetController {
  constructor(private readonly resetService: ResetService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async resetState() {
    await this.resetService.resetState();
    return 'OK';
  }
}
