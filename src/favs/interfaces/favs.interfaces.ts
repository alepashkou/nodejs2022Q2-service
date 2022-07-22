import { Album } from 'src/album/interfaces/album.interface';
import { Artist } from 'src/artist/entity/artist.entity';
import { Track } from 'src/track/interfaces/track.interface';

export interface Favorites {
  artistIds: string[];
  albumIds: string[];
  trackIds: string[];
}

export interface FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
