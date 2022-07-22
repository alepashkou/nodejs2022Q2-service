import { Injectable, NotFoundException } from '@nestjs/common';
import { Album } from '../entity/album.entity';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,
  ) {}

  async getAlbums(): Promise<Album[]> {
    return this.albumRepository.find();
  }

  async getAlbum(id: string): Promise<Album> {
    const findedAlbum = await this.albumRepository.findOneBy({ id });
    if (!findedAlbum) throw new NotFoundException('Not Found');
    return findedAlbum;
  }

  async createAlbum(albumDto: CreateAlbumDto): Promise<Album> {
    return this.albumRepository.save(albumDto);
  }

  async updateAlbum(id: string, albumDto: UpdateAlbumDto): Promise<Album> {
    const findedAlbum = await this.albumRepository.findOneBy({ id });
    if (!findedAlbum) throw new NotFoundException('Not Found');
    const updatedAlbum = {
      ...findedAlbum,
      ...albumDto,
    };
    this.albumRepository.update(id, updatedAlbum);
    return updatedAlbum;
  }

  async deleteAlbum(id: string): Promise<void> {
    const findedAlbum = await this.albumRepository.findOneBy({ id });
    if (!findedAlbum) throw new NotFoundException('Not Found');
    await this.albumRepository.delete(id);
  }

  async findByIds(ids: string[]): Promise<Album[]> {
    return this.albumRepository.find({ where: { id: In(ids) } });
  }
}
