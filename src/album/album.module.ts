import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { Service } from './.service';
import { AlbumService } from './album.service';

@Module({
  controllers: [AlbumController],
  providers: [Service, AlbumService],
})
export class AlbumModule {}
