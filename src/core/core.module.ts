import { Module } from '@nestjs/common';
import { DeleteService } from './services/delete.service';

@Module({
  providers: [DeleteService],
  exports: [DeleteService],
})
export class CoreModule {}
