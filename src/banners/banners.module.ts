import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Banner } from 'src/entities/Banner';
import { BannersController } from './banners.controller';
import { BannersService } from './banners.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Banner]),
    // AuthModule
  ],
  controllers: [BannersController],
  providers: [BannersService],
})
export class BannersModule {}
