import { Banner } from 'src/entities/Banner';
import { Users } from 'src/entities/Users';
import { EntityRepository, Repository } from 'typeorm';
import { BannerStatus } from './banner-status.enum';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';

@EntityRepository(Banner)
export class BannerRepository extends Repository<Banner> {
  async createBanner(
    createBannerDto: CreateBannerDto,
    //user: Users,
  ): Promise<Banner> {
    const { name, description, image } = createBannerDto;

    const banner = this.create({
      name,
      description,
      image,
      //status: BannerStatus.PUBLIC,
      //user,
    });

    await this.save(banner);
    return banner;
  }

  async updateBanner(updateBannerDto: UpdateBannerDto): Promise<Banner> {
    const { name, description, image } = updateBannerDto;

    const banner = this.create({ name, description, image });

    await this.save(banner);
    return banner;
  }
  async updateBanner2(
    id: number,
    banner: Banner,
    updateBannerDto: UpdateBannerDto,
  ): Promise<Banner> {
    await this.save(banner);
    return banner;
  }
}
