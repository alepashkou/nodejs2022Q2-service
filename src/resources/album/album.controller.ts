import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entity/album.entity';
import { AlbumService } from './services/album.service';

@UseGuards(AuthGuard)
@Controller('album')
export class AlbumController {
  constructor(private readonly albumServices: AlbumService) {}

  @Get()
  getAlbums(): Promise<Album[]> {
    return this.albumServices.getAlbums();
  }

  @Get(':id')
  getAlbum(@Param('id', new ParseUUIDPipe()) id: string): Promise<Album> {
    return this.albumServices.getAlbum(id);
  }

  @Post()
  createAlbum(@Body() album: CreateAlbumDto): Promise<Album> {
    return this.albumServices.createAlbum(album);
  }

  @Put(':id')
  updateAlbum(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() album: UpdateAlbumDto,
  ): Promise<Album> {
    return this.albumServices.updateAlbum(id, album);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteAlbum(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return this.albumServices.deleteAlbum(id);
  }
}
