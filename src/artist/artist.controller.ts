import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-aritst.dto';
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

  @Delete(':id')
  deleteArtist(@Param('id') id: string): { message: string } {
    return this.artistServices.deleteArtist(id);
  }
}
