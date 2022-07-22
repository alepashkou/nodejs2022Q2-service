import { Injectable, NotFoundException } from '@nestjs/common';
import { Track } from '../entity/track.entity';
import { CreateTrackDto } from '../dto/create-track.dto';
import { UpdateTrackDto } from '../dto/update-track.dto';
import { Repository, In } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,
  ) {}

  async getTracks(): Promise<Track[]> {
    return this.trackRepository.find();
  }

  async getTrack(id: string): Promise<Track> {
    const findedTrack = await this.trackRepository.findOneBy({ id });
    if (!findedTrack) throw new NotFoundException('Not Found');
    return findedTrack;
  }

  async createTrack(trackDto: CreateTrackDto): Promise<Track> {
    return this.trackRepository.save(trackDto);
  }

  async updateTrack(id: string, trackDto: UpdateTrackDto): Promise<Track> {
    const findedTrack = await this.trackRepository.findOneBy({ id });
    if (!findedTrack) throw new NotFoundException('Not Found');
    const updatedTrack = {
      ...findedTrack,
      ...trackDto,
    };
    this.trackRepository.update(id, updatedTrack);
    return updatedTrack;
  }

  async deleteTrack(id: string): Promise<void> {
    const findedTrack = await this.trackRepository.findOneBy({ id });
    if (!findedTrack) throw new NotFoundException('Not Found');
    await this.trackRepository.delete(id);
  }

  async findByIds(ids: string[]): Promise<Track[]> {
    return this.trackRepository.find({ where: { id: In(ids) } });
  }

  async deleteId(type: string, id: string): Promise<void> {
    return this.trackRepository
      .find({ where: { [type + 'Id']: id } })
      .then((tracks) => {
        tracks.forEach((track) =>
          this.trackRepository.update(track.id, { [type + 'Id']: null }),
        );
      });
  }
}
