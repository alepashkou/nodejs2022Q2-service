import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { TrackModule } from './track/track.module';
import { FavsModule } from './favs/favs.module';
@Module({
  imports: [ConfigModule.forRoot(), UserModule, ArtistModule, AlbumModule, TrackModule, FavsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
