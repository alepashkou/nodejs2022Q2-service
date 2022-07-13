import { Injectable } from '@nestjs/common';
import { AlbumService } from 'src/album/services/album.service';
import { FavsService } from 'src/favs/services/favs.service';
import { TrackService } from 'src/track/services/track.service';
import { OnEvent } from '@nestjs/event-emitter';
@Injectable()
export class DeleteService {
  constructor(
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
    private readonly favsService: FavsService,
  ) {}

  @OnEvent('delete.track')
  deleteTrack(id: string): void {
    this.favsService.deleteId('track', id);
  }

  @OnEvent('delete.artist')
  deleteArtist(id: string): void {
    this.trackService.deleteId('artist', id);
    this.favsService.deleteId('artist', id);
    this.albumService.deleteId('artist', id);
  }

  @OnEvent('delete.album')
  deleteAlbum(id: string): void {
    this.trackService.deleteId('album', id);
    this.favsService.deleteId('album', id);
  }
}
