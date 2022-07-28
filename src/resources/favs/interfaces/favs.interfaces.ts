import { Album } from 'src/resources/album/entity/album.entity';
import { Artist } from 'src/resources/artist/entity/artist.entity';
import { Track } from 'src/resources/track/entity/track.entity';

export interface FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
