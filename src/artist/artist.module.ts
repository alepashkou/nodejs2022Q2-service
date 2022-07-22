import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistController } from './artist.controller';
import { Artist } from './entity/artist.entity';
import { ArtistService } from './services/artist.service';

@Module({
  imports: [TypeOrmModule.forFeature([Artist])],
  exports: [ArtistService],
  controllers: [ArtistController],
  providers: [ArtistService],
})
export class ArtistModule {}
