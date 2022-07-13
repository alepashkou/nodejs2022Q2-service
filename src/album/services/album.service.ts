import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Album } from '../interfaces/album.interface';
import { validate as uuidValidate, v4 as uuidv4 } from 'uuid';
import { CreateAlbumDto } from '../dto/create-album.dto';

@Injectable()
export class AlbumService {
  album: Album[] = [];

  getAlbums(): Album[] {
    return this.album;
  }

  getAlbum(id: string): Album {
    if (!uuidValidate(id)) throw new BadRequestException('Not uuid');
    const findedAlbum = this.album.find((album) => album.id === id);
    if (!findedAlbum) throw new NotFoundException('Not Found');
    return findedAlbum;
  }

  createAlbum(albumDto: CreateAlbumDto): Album {
    const album = {
      id: uuidv4(),
      ...albumDto,
    };
    this.album.push(album);
    return album;
  }

  updateAlbum(id: string, albumDto: CreateAlbumDto): Album {
    if (!uuidValidate(id)) throw new BadRequestException('Not uuid');
    const findedAlbum = this.album.find((album) => album.id === id);
    if (!findedAlbum) throw new NotFoundException('Not Found');
    const updatedAlbum = {
      ...findedAlbum,
      ...albumDto,
    };
    this.album = this.album.map((album) =>
      album.id === id ? updatedAlbum : album,
    );
    return updatedAlbum;
  }

  deleteAlbum(id: string): { message: string } {
    if (!uuidValidate(id)) throw new BadRequestException('Not uuid');
    const findedAlbum = this.album.find((album) => album.id === id);
    if (!findedAlbum) throw new NotFoundException('Not Found');
    this.album = this.album.filter((album) => album.id !== id);
    return { message: 'Deleted' };
  }
}
