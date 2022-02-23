import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContentFaq as Faq } from 'src/entities/ContentFaq';
import { Repository } from 'typeorm';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';

@Injectable()
export class FaqsService {
  constructor(
    @InjectRepository(Faq)
    private faqRepository: Repository<Faq>,
  ) {}

  findAll(): Promise<Faq[]> {
    return this.faqRepository.find();
  }

  async findOne(id: number): Promise<Faq> {
    const found = await this.faqRepository.findOne(id);
    //found === null
    if (!found) {
      throw new NotFoundException(`Can't find Content with id ${id}`);
    }
    return found;
  }

  async create(createFaqDto: CreateFaqDto): Promise<Faq> {
    const { title, content, image } = createFaqDto;
    const faq = this.faqRepository.create({
      title,
      content,
      image,
    });
    await this.faqRepository.save(faq);
    return faq;
  }

  async delete(id: number): Promise<void> {
    const result = await this.faqRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Content with id ${id}`);
    }
    console.log(result);
  }

  async update(id: number, updateFaqDto: UpdateFaqDto): Promise<Faq> {
    const faq = await this.findOne(id);

    console.log(typeof id);

    const { title, content, image } = updateFaqDto;
    faq.title = title;
    faq.content = content;
    faq.image = image;

    await this.faqRepository.save(faq);
    return faq;
  }
}

/*

*/
