import { Banner } from 'src/entities/Banner';
import { Users } from 'src/entities/Users';
import { EntityRepository, Repository } from 'typeorm';
import { BannerStatus } from './banner-status.enum';
import { CreateBannerDto } from './dto/create-banner.dto';

@EntityRepository(Banner)
export class BannerRepository extends Repository<Banner> {
  async createBanner(
    createBannerDto: CreateBannerDto,
    //user: Users,
  ): Promise<Banner> {
    const { name, description } = createBannerDto;

    const banner = this.create({
      name,
      description,
      //status: BannerStatus.PUBLIC,
      //user,
    });

    await this.save(banner);
    return banner;
  }
}
