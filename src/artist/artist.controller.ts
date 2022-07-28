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
} from '@nestjs/common';
import { CreateArtistDto } from './dto/create-aritst.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entity/artist.entity';
import { ArtistService } from './services/artist.service';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistServices: ArtistService) {}

  @Get()
  getArtists(): Promise<Artist[]> {
    return this.artistServices.getArtists();
  }

  @Get(':id')
  getArtist(@Param('id', new ParseUUIDPipe()) id: string): Promise<Artist> {
    return this.artistServices.getArtist(id);
  }

  @Post()
  createArtist(@Body() artist: CreateArtistDto): Promise<Artist> {
    return this.artistServices.createArtist(artist);
  }

  @Put(':id')
  updateArtist(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() artist: UpdateArtistDto,
  ): Promise<Artist> {
    return this.artistServices.updateArtist(id, artist);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.artistServices.deleteArtist(id);
  }
}
