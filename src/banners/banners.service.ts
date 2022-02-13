import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Banner } from 'src/entities/Banner';
import { BannerRepository } from './banner.repository';
import { CreateBannerDto } from './dto/create-banner.dto';

@Injectable()
export class BannersService {
  constructor(
    @InjectRepository(BannerRepository)
    private bannerRepository: BannerRepository,
  ) {}

  async getAllBanners(): Promise<Banner[]> {
    const query = this.bannerRepository.createQueryBuilder('banner');
    //query.where('board.userId = :userId', { userId: user.id });
    const banners = await query.getMany();

    return banners;
  }

  createBanner(createBannerDto: CreateBannerDto): Promise<Banner> {
    // , user: User
    return this.bannerRepository.createBanner(createBannerDto); // , user
  }

  async getBannerById(id: number): Promise<Banner> {
    const found = await this.bannerRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Can't find Banner with id ${id}`);
    }

    return found;
  }

  async deleteBanner(id: number): Promise<void> {
    // , user: User
    const result = await this.bannerRepository.delete({ id }); // , user

    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Banner with id ${id}`);
    }
  }

  async updateBoardStatus(id: number): Promise<Banner> {
    //, status: BannerStatus
    const banner = await this.getBannerById(id);

    //banner.status = status;
    await this.bannerRepository.save(banner);

    return banner;
  }
}
