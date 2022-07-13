import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './interfaces/album.interface';
import { AlbumService } from './services/album.service';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumServices: AlbumService) {}

  @Get()
  getAlbums(): Album[] {
    return this.albumServices.getAlbums();
  }

  @Get(':id')
  getAlbum(@Param('id') id: string): Album {
    return this.albumServices.getAlbum(id);
  }

  @Post()
  createAlbum(@Body() album: CreateAlbumDto): Album {
    return this.albumServices.createAlbum(album);
  }

  @Put(':id')
  updateAlbum(@Param('id') id: string, @Body() album: UpdateAlbumDto): Album {
    return this.albumServices.updateAlbum(id, album);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteAlbum(@Param('id') id: string): void {
    return this.albumServices.deleteAlbum(id);
  }
}
