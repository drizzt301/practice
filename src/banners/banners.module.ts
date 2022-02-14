import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BannerRepository } from './banner.repository';
import { BannersController } from './banners.controller';
import { BannersService } from './banners.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([BannerRepository]),
    // AuthModule
  ],
  controllers: [BannersController],
  providers: [BannersService],
})
export class BannersModule {}
