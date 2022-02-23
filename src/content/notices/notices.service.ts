import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContentNotice as Notice } from 'src/entities/ContentNotice';
import { Repository } from 'typeorm';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { UpdateNoticeDto } from './dto/update-notice.dto';

@Injectable()
export class NoticesService {
  constructor(
    @InjectRepository(Notice)
    private noticeRepository: Repository<Notice>,
  ) {}

  findAll(): Promise<Notice[]> {
    return this.noticeRepository.find();
  }

  async findOne(id: number): Promise<Notice> {
    const found = await this.noticeRepository.findOne(id);
    //found === null
    if (!found) {
      throw new NotFoundException(`Can't find Content with id ${id}`);
    }
    return found;
  }

  async create(createNoticeDto: CreateNoticeDto): Promise<Notice> {
    const { title, content, image } = createNoticeDto;
    const notice = this.noticeRepository.create({
      title,
      content,
      image,
    });
    await this.noticeRepository.save(notice);
    return notice;
  }

  async delete(id: number): Promise<void> {
    const result = await this.noticeRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Content with id ${id}`);
    }
    console.log(result);
  }

  async update(id: number, updateNoticeDto: UpdateNoticeDto): Promise<Notice> {
    const notice = await this.findOne(id);

    console.log(typeof id);

    const { title, content, image } = updateNoticeDto;
    notice.title = title;
    notice.content = content;
    notice.image = image;

    await this.noticeRepository.save(notice);
    return notice;
  }
}

/*

*/
