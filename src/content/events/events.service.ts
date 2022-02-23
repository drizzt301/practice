import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContentEvent as Event } from 'src/entities/ContentEvent';
import { Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
  ) {}

  findAll(): Promise<Event[]> {
    return this.eventRepository.find();
  }

  async findOne(id: number): Promise<Event> {
    const found = await this.eventRepository.findOne(id);
    //found === null
    if (!found) {
      throw new NotFoundException(`Can't find Content with id ${id}`);
    }
    return found;
  }

  async create(createEventDto: CreateEventDto): Promise<Event> {
    const { title, content, image } = createEventDto;
    const event = this.eventRepository.create({
      title,
      content,
      image,
    });
    await this.eventRepository.save(event);
    return event;
  }

  async delete(id: number): Promise<void> {
    const result = await this.eventRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Content with id ${id}`);
    }
    console.log(result);
  }

  async update(id: number, updateEventDto: UpdateEventDto): Promise<Event> {
    const event = await this.findOne(id);

    console.log(typeof id);

    const { title, content, image } = updateEventDto;
    event.title = title;
    event.content = content;
    event.image = image;

    await this.eventRepository.save(event);
    return event;
  }
}

/*

*/
