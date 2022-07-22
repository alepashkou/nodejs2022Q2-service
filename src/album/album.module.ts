import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumController } from './album.controller';
import { Album } from './entity/album.entity';
import { AlbumService } from './services/album.service';

@Module({
  imports: [TypeOrmModule.forFeature([Album])],
  exports: [AlbumService],
  controllers: [AlbumController],
  providers: [AlbumService],
})
export class AlbumModule {}
