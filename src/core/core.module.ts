import { Module } from '@nestjs/common';
import { AlbumModule } from 'src/album/album.module';
import { ArtistModule } from 'src/artist/artist.module';
import { FavsModule } from 'src/favs/favs.module';
import { TrackModule } from 'src/track/track.module';
import { DeleteService } from './services/delete.service';

@Module({
  imports: [ArtistModule, AlbumModule, TrackModule, FavsModule],
  providers: [DeleteService],
  exports: [DeleteService],
})
export class CoreModule {}
