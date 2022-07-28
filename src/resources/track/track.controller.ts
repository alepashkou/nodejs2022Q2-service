import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entity/track.entity';
import { TrackService } from './services/track.service';

@UseGuards(AuthGuard)
@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  getAlbums(): Promise<Track[]> {
    return this.trackService.getTracks();
  }

  @Get(':id')
  getTrack(@Param('id', new ParseUUIDPipe()) id: string): Promise<Track> {
    return this.trackService.getTrack(id);
  }

  @Post()
  createTrack(@Body() track: CreateTrackDto): Promise<Track> {
    return this.trackService.createTrack(track);
  }

  @Put(':id')
  updateTrack(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() track: UpdateTrackDto,
  ): Promise<Track> {
    return this.trackService.updateTrack(id, track);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteTrack(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return this.trackService.deleteTrack(id);
  }
}
