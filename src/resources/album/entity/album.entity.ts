import { Artist } from 'src/resources/artist/entity/artist.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity('Album')
export class Album {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  year: number;

  @Column({ nullable: true })
  artistId: string;

  @ManyToOne(() => Artist, { onDelete: 'SET NULL' })
  artist: Artist;
}
