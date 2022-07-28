import { Injectable, NotFoundException } from '@nestjs/common';
import { Album } from '../entity/album.entity';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,
    private eventEmitter: EventEmitter2,
  ) {}

  async getAlbums() {
    return this.albumRepository.find();
  }

  async getAlbum(id: string) {
    const findedAlbum = await this.albumRepository.findOneBy({ id });
    if (!findedAlbum) throw new NotFoundException('Not Found');

    return findedAlbum;
  }

  async createAlbum(albumDto: CreateAlbumDto) {
    return this.albumRepository.save(albumDto);
  }

  async updateAlbum(id: string, albumDto: UpdateAlbumDto) {
    const findedAlbum = await this.albumRepository.findOneBy({ id });
    if (!findedAlbum) throw new NotFoundException('Not Found');

    const updatedAlbum = {
      ...findedAlbum,
      ...albumDto,
    };

    this.albumRepository.update(id, updatedAlbum);
    return updatedAlbum;
  }

  async deleteAlbum(id: string) {
    const findedAlbum = await this.albumRepository.findOneBy({ id });
    if (!findedAlbum) throw new NotFoundException('Not Found');

    this.eventEmitter.emit('delete.album', id);
    await this.albumRepository.delete(id);
  }

  async findByIds(ids: string[]) {
    return this.albumRepository.find({ where: { id: In(ids) } });
  }
}
