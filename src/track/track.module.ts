import { Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { TrackService } from './services/track.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from './entity/track.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Track])],
  exports: [TrackService],
  controllers: [TrackController],
  providers: [TrackService],
})
export class TrackModule {}
