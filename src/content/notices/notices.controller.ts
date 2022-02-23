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
import { ContentNotice as Notice } from 'src/entities/ContentNotice';
import { Users } from 'src/entities/Users';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { UpdateNoticeDto } from './dto/update-notice.dto';
import { NoticesService } from './notices.service';

@Controller('content/notices')
export class NoticesController {
  private logger = new Logger('ContentNotices');
  constructor(private noticesService: NoticesService) {}

  @Post()
  create(@Body() createNoticeDto: CreateNoticeDto): Promise<Notice> {
    return this.noticesService.create(createNoticeDto);
  }

  @Get()
  findAll(): Promise<Notice[]> {
    this.logger.verbose(`User trying to get all ContentNotices`);
    return this.noticesService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: number): Promise<Notice> {
    return this.noticesService.findOne(id);
  }

  @Patch('/:id')
  update(
    @Param('id') id: string,
    @Body() updateNoticeDto: UpdateNoticeDto,
  ): Promise<Notice> {
    console.log(typeof id);
    // console.log('controller : ' + updateContentDto);
    return this.noticesService.update(+id, updateNoticeDto);
  }

  @Delete('/:id')
  delete(
    @Param('id', ParseIntPipe) id,
    //@GetUser() user:User
  ): Promise<void> {
    return this.noticesService.delete(id); // , user
  }
}

/*

*/
