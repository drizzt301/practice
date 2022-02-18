import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContentNotice as Content } from 'src/entities/ContentNotice';
import { Repository } from 'typeorm';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';

@Injectable()
export class ContentsService {
  constructor(
    @InjectRepository(Content)
    private contentRepository: Repository<Content>,
  ) {}

  findAll(): Promise<Content[]> {
    return this.contentRepository.find();
  }

  async findOne(id: number): Promise<Content> {
    const found = await this.contentRepository.findOne(id);
    //found === null
    if (!found) {
      throw new NotFoundException(`Can't find Content with id ${id}`);
    }
    return found;
  }

  async create(createContentDto: CreateContentDto): Promise<Content> {
    const { title, content, image } = createContentDto;
    const contentN = this.contentRepository.create({
      title,
      content,
      image,
    });
    await this.contentRepository.save(contentN);
    return contentN;
  }

  async delete(id: number): Promise<void> {
    const result = await this.contentRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Content with id ${id}`);
    }
    console.log(result);
  }

  async update(
    id: number,
    updateContentDto: UpdateContentDto,
  ): Promise<Content> {
    const contentN = await this.findOne(id);

    console.log(typeof id);

    const { title, content, image } = updateContentDto;
    contentN.title = title;
    contentN.content = content;
    contentN.image = image;

    await this.contentRepository.save(contentN);
    return contentN;
  }
}

/*

*/
