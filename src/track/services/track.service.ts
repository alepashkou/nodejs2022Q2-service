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
  track: Track[] = [];
  getTracks(): Track[] {
    return this.track;
  }

  getTrack(id: string): Track {
    if (!uuidValidate(id)) throw new BadRequestException('Not uuid');
    const findedTrack = this.track.find((track) => track.id === id);
    if (!findedTrack) throw new NotFoundException('Not Found');
    return findedTrack;
  }

  createTrack(trackDto: CreateTrackDto): Track {
    const track = {
      id: uuidv4(),
      ...trackDto,
    };
    this.track.push(track);
    return track;
  }

  updateTrack(id: string, trackDto: UpdateTrackDto): Track {
    if (!uuidValidate(id)) throw new BadRequestException('Not uuid');
    const findedTrack = this.track.find((track) => track.id === id);
    if (!findedTrack) throw new NotFoundException('Not Found');
    const updatedTrack = {
      ...findedTrack,
      ...trackDto,
    };
    this.track = this.track.map((track) =>
      track.id === id ? updatedTrack : track,
    );
    return updatedTrack;
  }

  deleteTrack(id: string): void {
    if (!uuidValidate(id)) throw new BadRequestException('Not uuid');
    const findedTrack = this.track.find((track) => track.id === id);
    if (!findedTrack) throw new NotFoundException('Not Found');
    this.track = this.track.filter((track) => track.id !== id);
  }
}
