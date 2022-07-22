import { Album } from 'src/album/entity/album.entity';
import { Artist } from 'src/artist/entity/artist.entity';
import { Track } from 'src/track/entity/track.entity';

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
