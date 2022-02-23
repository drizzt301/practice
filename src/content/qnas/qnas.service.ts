import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContentQna as Qna } from 'src/entities/ContentQna';
import { Repository } from 'typeorm';
import { CreateQnaDto } from './dto/create-qna.dto';
import { UpdateQnaDto } from './dto/update-qna.dto';

@Injectable()
export class QnasService {
  constructor(
    @InjectRepository(Qna)
    private qnaRepository: Repository<Qna>,
  ) {}

  findAll(): Promise<Qna[]> {
    return this.qnaRepository.find();
  }

  async findOne(id: number): Promise<Qna> {
    const found = await this.qnaRepository.findOne(id);
    //found === null
    if (!found) {
      throw new NotFoundException(`Can't find Content with id ${id}`);
    }
    return found;
  }

  async create(createQnaDto: CreateQnaDto): Promise<Qna> {
    const { title, content, image } = createQnaDto;
    const qna = this.qnaRepository.create({
      title,
      content,
      image,
    });
    await this.qnaRepository.save(qna);
    return qna;
  }

  async delete(id: number): Promise<void> {
    const result = await this.qnaRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Content with id ${id}`);
    }
    console.log(result);
  }

  async update(id: number, updateQnaDto: UpdateQnaDto): Promise<Qna> {
    const qna = await this.findOne(id);

    console.log(typeof id);

    const { title, content, image } = updateQnaDto;
    qna.title = title;
    qna.content = content;
    qna.image = image;

    await this.qnaRepository.save(qna);
    return qna;
  }
}

/*

*/
