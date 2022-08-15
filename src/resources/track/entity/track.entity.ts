import { Album } from 'src/resources/album/entity/album.entity';
import { Artist } from 'src/resources/artist/entity/artist.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity('Track')
export class Track {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  artistId: string;

  @Column({ nullable: true })
  albumId: string;

  @Column()
  duration: number;

  @ManyToOne(() => Artist, { onDelete: 'SET NULL' })
  artist: Artist;

  @ManyToOne(() => Album, { onDelete: 'SET NULL' })
  album: Album;
}
