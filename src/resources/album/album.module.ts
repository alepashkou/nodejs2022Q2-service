import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { AlbumController } from './album.controller';
import { Album } from './entity/album.entity';
import { AlbumService } from './services/album.service';

@Module({
  imports: [TypeOrmModule.forFeature([Album]), AuthModule],
  exports: [AlbumService],
  controllers: [AlbumController],
  providers: [AlbumService],
})
export class AlbumModule {}
