import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Artist } from '../interfaces/artist.interface';
import { validate as uuidValidate, v4 as uuidv4 } from 'uuid';
import { CreateArtistDto } from '../dto/create-aritst.dto';
import { UpdateArtistDto } from '../dto/update-artist.dto';

@Injectable()
export class ArtistService {
  artists: Artist[] = [];

  getArtists(): Artist[] {
    return this.artists;
  }

  getArtist(id: string): Artist {
    if (!uuidValidate(id)) throw new BadRequestException('Not uuid');
    const findedArtist = this.artists.find((artist) => artist.id === id);
    if (!findedArtist) throw new NotFoundException('Not Found');
    return findedArtist;
  }

  createArtist(artistDto: CreateArtistDto): Artist {
    const artist = {
      id: uuidv4(),
      ...artistDto,
    };
    this.artists.push(artist);
    return artist;
  }

  updateArtist(id: string, artistDto: UpdateArtistDto): Artist {
    if (!uuidValidate(id)) throw new BadRequestException('Not uuid');
    const findedArtist = this.artists.find((artist) => artist.id === id);
    if (!findedArtist) throw new NotFoundException('Not Found');
    const updatedArtist = {
      ...findedArtist,
      ...artistDto,
    };
    this.artists = this.artists.map((artist) =>
      artist.id === id ? updatedArtist : artist,
    );
    return updatedArtist;
  }

  deleteArtist(id: string): { message: string } {
    if (!uuidValidate(id)) throw new BadRequestException('Not uuid');
    const findedArtist = this.artists.find((artist) => artist.id === id);
    if (!findedArtist) throw new NotFoundException('Not Found');
    this.artists = this.artists.filter((artist) => artist.id !== id);
    return { message: 'Deleted' };
  }
}
