import { Album } from 'src/album/entity/album.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Artist {
  @PrimaryGeneratedColumn('uuid')
  @OneToMany(() => Album, (album) => album.artistId)
  id: string;

  @Column()
  name: string;

  @Column({ default: false })
  grammy: boolean;
}
