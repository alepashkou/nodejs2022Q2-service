import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './services/album.service';

@Module({
  exports: [AlbumService],
  controllers: [AlbumController],
  providers: [AlbumService],
})
export class AlbumModule {}
