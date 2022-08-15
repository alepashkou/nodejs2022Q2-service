import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumModule } from 'src/resources/album/album.module';
import { ArtistModule } from 'src/resources/artist/artist.module';
import { TrackModule } from 'src/resources/track/track.module';
import { AuthModule } from '../auth/auth.module';
import { Favorites } from './entity/favs.entity';
import { FavsController } from './favs.controller';
import { FavsService } from './services/favs.service';

@Module({
  imports: [
    AlbumModule,
    ArtistModule,
    TrackModule,
    TypeOrmModule.forFeature([Favorites]),
    AuthModule,
  ],
  exports: [FavsService],
  controllers: [FavsController],
  providers: [FavsService],
})
export class FavsModule {}
