import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
} from '@nestjs/common';
import { ContentEvent as Event } from 'src/entities/ContentEvent';
import { Users } from 'src/entities/Users';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventsService } from './events.service';

@Controller('content/events')
export class EventsController {
  private logger = new Logger('ContentEvents');
  constructor(private eventsService: EventsService) {}

  @Post()
  create(@Body() createEventDto: CreateEventDto): Promise<Event> {
    return this.eventsService.create(createEventDto);
  }

  @Get()
  findAll(): Promise<Event[]> {
    this.logger.verbose(`User trying to get all ContentEvents`);
    return this.eventsService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: number): Promise<Event> {
    return this.eventsService.findOne(id);
  }

  @Patch('/:id')
  update(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
  ): Promise<Event> {
    console.log(typeof id);
    // console.log('controller : ' + updateContentDto);
    return this.eventsService.update(+id, updateEventDto);
  }

  @Delete('/:id')
  delete(
    @Param('id', ParseIntPipe) id,
    //@GetUser() user:User
  ): Promise<void> {
    return this.eventsService.delete(id); // , user
  }
}

/*

*/
