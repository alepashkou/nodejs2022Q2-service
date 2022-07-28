import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { AlbumService } from 'src/album/services/album.service';
import { ArtistService } from 'src/artist/services/artist.service';
import { TrackService } from 'src/track/services/track.service';
import { FavoritesResponse } from '../interfaces/favs.interfaces';
import { Album } from 'src/album/entity/album.entity';
import { Artist } from 'src/artist/entity/artist.entity';
import { Track } from 'src/track/entity/track.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Favorites } from '../entity/favs.entity';
import { Repository } from 'typeorm';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class FavsService {
  constructor(
    @InjectRepository(Favorites)
    private readonly favoritesRepository: Repository<Favorites>,
    private readonly artistService: ArtistService,
    private readonly albumService: AlbumService,
    private readonly trackSerrvice: TrackService,
  ) {}

  async getFavorites(): Promise<FavoritesResponse> {
    const allFavorites = await this.favoritesRepository.find();
    const ids = {
      artistIds: [],
      albumIds: [],
      trackIds: [],
    };

    allFavorites.forEach((fav) => {
      if (fav.type === 'artist') {
        ids.artistIds.push(fav.typeId);
      }
      if (fav.type === 'album') {
        ids.albumIds.push(fav.typeId);
      }
      if (fav.type === 'track') {
        ids.trackIds.push(fav.typeId);
      }
    });
    const artists = await this.artistService.findByIds(ids.artistIds);
    const albums = await this.albumService.findByIds(ids.albumIds);
    const tracks = await this.trackSerrvice.findByIds(ids.trackIds);

    return { artists, albums, tracks };
  }

  async addFavorite(type: string, id: string): Promise<Artist | Album | Track> {
    switch (type) {
      case 'artist':
        const artist = (await this.artistService.getArtists()).find(
          (artist) => artist.id === id,
        );
        if (!artist) throw new UnprocessableEntityException('Artist not found');
        await this.favoritesRepository.save({
          type: 'artist',
          typeId: id,
        });
        return this.artistService.getArtist(id);
      case 'album':
        const album = (await this.albumService.getAlbums()).find(
          (album) => album.id === id,
        );
        if (!album) throw new UnprocessableEntityException('Album not found');
        await this.favoritesRepository.save({
          type: 'album',
          typeId: id,
        });
        return this.albumService.getAlbum(id);
      case 'track':
        const track = (await this.trackSerrvice.getTracks()).find(
          (track) => track.id === id,
        );
        if (!track) throw new UnprocessableEntityException('Track not found');
        await this.favoritesRepository.save({
          type: 'track',
          typeId: id,
        });
        return this.trackSerrvice.getTrack(id);
      default:
        throw new Error('Unknown type');
    }
  }
  async deleteFavorite(type: string, id: string) {
    switch (type) {
      case 'artist':
        return this.favoritesRepository.delete({ type: 'artist', typeId: id });
      case 'album':
        return this.favoritesRepository.delete({ type: 'album', typeId: id });
      case 'track':
        return this.favoritesRepository.delete({ type: 'track', typeId: id });
      default:
        throw new Error('Unknown type');
    }
  }
  @OnEvent('delete.track')
  deleteTrack(id: string) {
    this.favoritesRepository.delete({ type: 'track', typeId: id });
  }

  @OnEvent('delete.artist')
  deleteArtist(id: string) {
    this.favoritesRepository.delete({ type: 'artist', typeId: id });
  }

  @OnEvent('delete.album')
  deleteAlbum(id: string) {
    this.favoritesRepository.delete({ type: 'album', typeId: id });
  }
}
