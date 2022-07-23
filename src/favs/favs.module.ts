import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumModule } from 'src/album/album.module';
import { ArtistModule } from 'src/artist/artist.module';
import { TrackModule } from 'src/track/track.module';
import { Favorites } from './entity/favs.entity';
import { FavsController } from './favs.controller';
import { FavsService } from './services/favs.service';

@Module({
  imports: [
    AlbumModule,
    ArtistModule,
    TrackModule,
    TypeOrmModule.forFeature([Favorites]),
  ],
  exports: [FavsService],
  controllers: [FavsController],
  providers: [FavsService],
})
export class FavsModule {}
