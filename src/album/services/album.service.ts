import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Album } from '../interfaces/album.interface';
import { validate as uuidValidate, v4 as uuidv4 } from 'uuid';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';
import { EventEmitter2 } from 'eventemitter2';
@Injectable()
export class AlbumService {
  albums: Album[] = [];

  constructor(private eventEmitter: EventEmitter2) {}

  getAlbums(): Album[] {
    return this.albums;
  }

  getAlbum(id: string): Album {
    if (!uuidValidate(id)) throw new BadRequestException('Not uuid');
    const findedAlbum = this.albums.find((album) => album.id === id);
    if (!findedAlbum) throw new NotFoundException('Not Found');
    return findedAlbum;
  }

  createAlbum(albumDto: CreateAlbumDto): Album {
    const album = {
      id: uuidv4(),
      ...albumDto,
    };
    this.albums.push(album);
    return album;
  }

  updateAlbum(id: string, albumDto: UpdateAlbumDto): Album {
    if (!uuidValidate(id)) throw new BadRequestException('Not uuid');
    const findedAlbum = this.albums.find((album) => album.id === id);
    if (!findedAlbum) throw new NotFoundException('Not Found');
    const updatedAlbum = {
      ...findedAlbum,
      ...albumDto,
    };
    this.albums = this.albums.map((album) =>
      album.id === id ? updatedAlbum : album,
    );
    return updatedAlbum;
  }

  deleteAlbum(id: string): void {
    if (!uuidValidate(id)) throw new BadRequestException('Not uuid');
    const findedAlbum = this.albums.find((album) => album.id === id);
    if (!findedAlbum) throw new NotFoundException('Not Found');
    this.albums = this.albums.filter((album) => album.id !== id);
    this.eventEmitter.emit('delete.album', id);
  }

  findByIds(ids: string[]): Album[] {
    return this.albums.filter((album) => ids.includes(album.id));
  }

  deleteId(type: string, id: string) {
    this.albums = this.albums.map((album) => {
      if (album[type + 'Id'] === id) {
        return { ...album, [type + 'Id']: null };
      }
      return album;
    });
  }
}
