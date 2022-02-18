import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Banner } from 'src/entities/Banner';
import { Repository } from 'typeorm';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';

@Injectable()
export class BannersService {
  constructor(
    @InjectRepository(Banner)
    private bannerRepository: Repository<Banner>,
  ) {}

  findAll(): Promise<Banner[]> {
    return this.bannerRepository.find();
  }

  async findOne(id: number): Promise<Banner> {
    const found = await this.bannerRepository.findOne(id);
    //found === null
    if (!found) {
      throw new NotFoundException(`Can't find Banner with id ${id}`);
    }
    return found;
  }

  async create(createBannerDto: CreateBannerDto): Promise<Banner> {
    const { name, description, image } = createBannerDto;
    const banner = this.bannerRepository.create({
      name,
      description,
      image,
    });
    await this.bannerRepository.save(banner);
    return banner;
  }

  async delete(id: number): Promise<void> {
    const result = await this.bannerRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Banner with id ${id}`);
    }
    console.log(result);
  }

  async update(id: number, updateBannerDto: UpdateBannerDto): Promise<Banner> {
    const banner = await this.findOne(id);

    console.log(typeof id);

    const { name, description, image } = updateBannerDto;
    banner.name = name;
    banner.description = description;
    banner.image = image;

    await this.bannerRepository.save(banner);
    return banner;
  }
}

/*
if (name && name !== undefined) {
  banner.name = name;
  console.log(name);
}
if (description && description !== undefined) {
  banner.description = description;
  console.log(description);
}
if (image && image !== undefined) {
  banner.image = image;
  console.log(image);
}
*/
