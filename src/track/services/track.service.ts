import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Track } from '../interfaces/track.interface';
import { validate as uuidValidate, v4 as uuidv4 } from 'uuid';
import { CreateTrackDto } from '../dto/create-track.dto';
import { UpdateTrackDto } from '../dto/update-track.dto';

@Injectable()
export class TrackService {
  tracks: Track[] = [];

  getTracks(): Track[] {
    return this.tracks;
  }

  getTrack(id: string): Track {
    if (!uuidValidate(id)) throw new BadRequestException('Not uuid');
    const findedTrack = this.tracks.find((track) => track.id === id);
    if (!findedTrack) throw new NotFoundException('Not Found');
    return findedTrack;
  }

  createTrack(trackDto: CreateTrackDto): Track {
    const track = {
      id: uuidv4(),
      ...trackDto,
    };
    this.tracks.push(track);
    return track;
  }

  updateTrack(id: string, trackDto: UpdateTrackDto): Track {
    if (!uuidValidate(id)) throw new BadRequestException('Not uuid');
    const findedTrack = this.tracks.find((track) => track.id === id);
    if (!findedTrack) throw new NotFoundException('Not Found');
    const updatedTrack = {
      ...findedTrack,
      ...trackDto,
    };
    this.tracks = this.tracks.map((track) =>
      track.id === id ? updatedTrack : track,
    );
    return updatedTrack;
  }

  deleteTrack(id: string): void {
    if (!uuidValidate(id)) throw new BadRequestException('Not uuid');
    const findedTrack = this.tracks.find((track) => track.id === id);
    if (!findedTrack) throw new NotFoundException('Not Found');
    this.tracks = this.tracks.filter((track) => track.id !== id);
  }
  findByIds(ids: string[]): Track[] {
    return this.tracks.filter((track) => ids.includes(track.id));
  }
}
