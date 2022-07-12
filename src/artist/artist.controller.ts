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
import { CreateArtistDto } from './dto/create-aritst.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './interfaces/artist.interface';
import { ArtistService } from './services/artist.service';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistServices: ArtistService) {}

  @Get()
  getArtists(): Artist[] {
    return this.artistServices.getArtists();
  }

  @Get(':id')
  getArtist(@Param('id') id: string): Artist {
    return this.artistServices.getArtist(id);
  }

  @Post()
  createArtist(@Body() artist: CreateArtistDto): Artist {
    return this.artistServices.createArtist(artist);
  }

  @Put(':id')
  updateArtist(
    @Param('id') id: string,
    @Body() artist: UpdateArtistDto,
  ): Artist {
    return this.artistServices.updateArtist(id, artist);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteArtist(@Param('id') id: string) {
    return this.artistServices.deleteArtist(id);
  }
}
