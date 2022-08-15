import { Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { TrackService } from './services/track.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from './entity/track.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Track]), AuthModule],
  exports: [TrackService],
  controllers: [TrackController],
  providers: [TrackService],
})
export class TrackModule {}
