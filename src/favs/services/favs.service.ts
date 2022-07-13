import {
  BadRequestException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AlbumService } from 'src/album/services/album.service';
import { ArtistService } from 'src/artist/services/artist.service';
import { TrackService } from 'src/track/services/track.service';
import { Favorites, FavoritesResponse } from '../interfaces/favs.interfaces';
import { validate as uuidValidate } from 'uuid';
import { Album } from 'src/album/interfaces/album.interface';
import { Artist } from 'src/artist/interfaces/artist.interface';
import { Track } from 'src/track/interfaces/track.interface';

@Injectable()
export class FavsService {
  favorites: Favorites = {
    artistIds: [],
    albumIds: [],
    trackIds: [],
  };
  constructor(
    private readonly artistService: ArtistService,
    private readonly albumService: AlbumService,
    private readonly trackSerrvice: TrackService,
  ) {}

  getFavorites(): FavoritesResponse {
    const { artistIds, albumIds, trackIds } = this.favorites;
    const artists = this.artistService.findByIds(artistIds);
    const albums = this.albumService.findByIds(albumIds);
    const tracks = this.trackSerrvice.findByIds(trackIds);
    return { artists, albums, tracks };
  }
  addFavorite(type: string, id: string): Artist | Album | Track {
    if (!uuidValidate(id)) throw new BadRequestException('Not uuid');
    switch (type) {
      case 'artist':
        const artist = this.artistService
          .getArtists()
          .find((artist) => artist.id === id);
        if (!artist) throw new UnprocessableEntityException('Artist not found');
        this.favorites.artistIds.push(id);
        return artist;
      case 'album':
        const album = this.albumService
          .getAlbums()
          .find((album) => album.id === id);
        if (!album) throw new UnprocessableEntityException('Artist not found');
        this.favorites.albumIds.push(id);
        return album;
      case 'track':
        const track = this.trackSerrvice
          .getTracks()
          .find((track) => track.id === id);
        if (!track) throw new UnprocessableEntityException('Artist not found');
        this.favorites.trackIds.push(id);
        return track;
      default:
        throw new Error('Unknown type');
    }
  }
  deleteFavorite(type: string, id: string): void {
    if (!uuidValidate(id)) throw new BadRequestException('Not uuid');
    switch (type) {
      case 'artist':
        this.favorites.artistIds = this.favorites.artistIds.filter(
          (artistId) => artistId !== id,
        );
        break;
      case 'album':
        this.favorites.albumIds = this.favorites.albumIds.filter(
          (albumId) => albumId !== id,
        );
        break;
      case 'track':
        this.favorites.trackIds = this.favorites.trackIds.filter(
          (trackId) => trackId !== id,
        );
        break;
      default:
        throw new Error('Unknown type');
    }
  }
  deleteId(type: string, id: string) {
    this.favorites[type + 'Ids'] = this.favorites[type + 'Ids'].filter(
      (itemId) => itemId !== id,
    );
  }
}
