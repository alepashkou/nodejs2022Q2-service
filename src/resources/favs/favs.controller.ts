import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Album } from 'src/resources/album/entity/album.entity';
import { Artist } from 'src/resources/artist/entity/artist.entity';
import { Track } from 'src/resources/track/entity/track.entity';
import { AuthGuard } from '../auth/auth.guard';
import { FavoritesResponse } from './interfaces/favs.interfaces';
import { FavsService } from './services/favs.service';

@UseGuards(AuthGuard)
@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  getFavorites(): Promise<FavoritesResponse> {
    return this.favsService.getFavorites();
  }

  @Post('/:type/:id')
  addFavorite(
    @Param('type') type: string,
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<Artist | Album | Track> {
    return this.favsService.addFavorite(type, id);
  }

  @Delete('/:type/:id')
  @HttpCode(204)
  async deleteFavorite(
    @Param('type') type: string,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    await this.favsService.deleteFavorite(type, id);
  }
}
