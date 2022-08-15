import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Token')
export class Token {
  @PrimaryGeneratedColumn('uuid')
  tokenId: string;

  @Column()
  userId: string;

  @Column()
  accessToken: string;

  @Column()
  refreshToken: string;
}
