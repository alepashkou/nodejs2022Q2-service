import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './interfaces/track.interface';
import { TrackService } from './services/track.service';

@Controller('track')
export class TrackController {
  albumServices: any;
  constructor(private readonly trackService: TrackService) {}

  @Get()
  getAlbums(): Track[] {
    return this.trackService.getTracks();
  }

  @Get(':id')
  getTrack(@Param('id') id: string): Track {
    return this.trackService.getTrack(id);
  }

  @Post()
  createTrack(@Body() track: CreateTrackDto): Track {
    return this.trackService.createTrack(track);
  }

  @Put(':id')
  updateTrack(@Param('id') id: string, @Body() track: UpdateTrackDto): Track {
    return this.trackService.updateTrack(id, track);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteTrack(@Param('id') id: string): void {
    return this.trackService.deleteTrack(id);
  }
}
