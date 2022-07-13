import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Track } from '../interfaces/track.interface';
import { v4 as uuidv4 } from 'uuid';
import { CreateTrackDto } from '../dto/create-track.dto';
import { UpdateTrackDto } from '../dto/update-track.dto';
import { EventEmitter2 } from 'eventemitter2';
@Injectable()
export class TrackService {
  constructor(private eventEmitter: EventEmitter2) {}
  tracks: Track[] = [];

  getTracks(): Track[] {
    return this.tracks;
  }

  getTrack(id: string): Track {
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
    const findedTrack = this.tracks.find((track) => track.id === id);
    if (!findedTrack) throw new NotFoundException('Not Found');
    this.tracks = this.tracks.filter((track) => track.id !== id);
    this.eventEmitter.emit('delete.track', id);
  }

  findByIds(ids: string[]): Track[] {
    return this.tracks.filter((track) => ids.includes(track.id));
  }

  deleteId(type: string, id: string) {
    this.tracks = this.tracks.map((track) => {
      if (track[type + 'Id'] === id) {
        return { ...track, [type + 'Id']: null };
      }
      return track;
    });
  }
}
