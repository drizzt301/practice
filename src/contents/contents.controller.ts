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
import { ContentNotice as Content } from 'src/entities/ContentNotice';
import { Users } from 'src/entities/Users';
//import { ContentStatus } from './content-status.enum';
import { ContentsService } from './contents.service';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
//import { ContentStatusValidationPipe } from './pipes/content-status-validation.pipe';

@Controller('contents')
export class ContentsController {
  private logger = new Logger('Contents');
  constructor(private contentsService: ContentsService) {}

  @Post()
  create(@Body() createContentDto: CreateContentDto): Promise<Content> {
    return this.contentsService.create(createContentDto);
  }

  @Get()
  findAll(): Promise<Content[]> {
    this.logger.verbose(`User trying to get all contents`);
    return this.contentsService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: number): Promise<Content> {
    return this.contentsService.findOne(id);
  }

  @Patch('/:id')
  update(
    @Param('id') id: string,
    @Body() updateContentDto: UpdateContentDto,
  ): Promise<Content> {
    console.log(typeof id);
    // console.log('controller : ' + updateContentDto);
    return this.contentsService.update(+id, updateContentDto);
  }

  @Delete('/:id')
  delete(
    @Param('id', ParseIntPipe) id,
    //@GetUser() user:User
  ): Promise<void> {
    return this.contentsService.delete(id); // , user
  }
}

/*

*/
