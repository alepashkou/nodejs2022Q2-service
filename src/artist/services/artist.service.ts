import { Injectable, NotFoundException } from '@nestjs/common';
import { Artist } from '../entity/artist.entity';
import { CreateArtistDto } from '../dto/create-aritst.dto';
import { UpdateArtistDto } from '../dto/update-artist.dto';
import { EventEmitter2 } from 'eventemitter2';
import { Repository, In } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ArtistService {
  artists: Artist[] = [];

  constructor(
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
    private eventEmitter: EventEmitter2,
  ) {}

  async getArtists(): Promise<Artist[]> {
    return this.artistRepository.find();
  }

  async getArtist(id: string): Promise<Artist> {
    const findedArtist = await this.artistRepository.findOneBy({ id });
    if (!findedArtist) throw new NotFoundException('Not Found');
    return findedArtist;
  }

  async createArtist(artistDto: CreateArtistDto): Promise<Artist> {
    return this.artistRepository.save(artistDto);
  }

  async updateArtist(id: string, artistDto: UpdateArtistDto): Promise<Artist> {
    const findedArtist = await this.artistRepository.findOneBy({ id });
    if (!findedArtist) throw new NotFoundException('Not Found');
    const updatedArtist = {
      ...findedArtist,
      ...artistDto,
    };
    await this.artistRepository.update(id, updatedArtist);
    return updatedArtist;
  }

  async deleteArtist(id: string): Promise<void> {
    const findedArtist = await this.artistRepository.findOneBy({ id });
    if (!findedArtist) throw new NotFoundException('Not Found');
    await this.artistRepository.delete(id);
    this.eventEmitter.emit('delete.artist', id);
  }

  async findByIds(ids: string[]): Promise<Artist[]> {
    return this.artistRepository.find({ where: { id: In(ids) } });
  }
}
