import { Module } from '@nestjs/common';
import { AlbumModule } from 'src/album/album.module';
import { ArtistModule } from 'src/artist/artist.module';
import { TrackModule } from 'src/track/track.module';
import { FavsController } from './favs.controller';
import { FavsService } from './services/favs.service';

@Module({
  imports: [AlbumModule, ArtistModule, TrackModule],
  exports: [FavsService],
  controllers: [FavsController],
  providers: [FavsService],
})
export class FavsModule {}
