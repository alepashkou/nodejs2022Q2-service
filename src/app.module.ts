import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { TrackModule } from './track/track.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavsModule } from './favs/favs.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import config from './ormconfig';
@Module({
  imports: [
    ConfigModule.forRoot(),
    EventEmitterModule.forRoot(),
    UserModule,
    ArtistModule,
    AlbumModule,
    TrackModule,
    FavsModule,
    TypeOrmModule.forRoot(config),
  ],
})
export class AppModule {}
