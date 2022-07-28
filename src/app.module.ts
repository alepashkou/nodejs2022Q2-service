import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './resources/user/user.module';
import { ArtistModule } from './resources/artist/artist.module';
import { AlbumModule } from './resources/album/album.module';
import { TrackModule } from './resources/track/track.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavsModule } from './resources/favs/favs.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { configOptions } from './ormconfig';
import { AuthModule } from './resources/auth/auth.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    EventEmitterModule.forRoot(),
    UserModule,
    ArtistModule,
    AlbumModule,
    TrackModule,
    FavsModule,
    TypeOrmModule.forRoot(configOptions),
    AuthModule,
  ],
})
export class AppModule {}
