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
import { ContentQna as Qna } from 'src/entities/ContentQna';
import { Users } from 'src/entities/Users';
import { CreateQnaDto } from './dto/create-qna.dto';
import { UpdateQnaDto } from './dto/update-qna.dto';
import { QnasService } from './qnas.service';

@Controller('content/qnas')
export class QnasController {
  private logger = new Logger('ContentQnas');
  constructor(private qnasService: QnasService) {}

  @Post()
  create(@Body() createQnaDto: CreateQnaDto): Promise<Qna> {
    return this.qnasService.create(createQnaDto);
  }

  @Get()
  findAll(): Promise<Qna[]> {
    this.logger.verbose(`User trying to get all ContentQnas`);
    return this.qnasService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: number): Promise<Qna> {
    return this.qnasService.findOne(id);
  }

  @Patch('/:id')
  update(
    @Param('id') id: string,
    @Body() updateQnaDto: UpdateQnaDto,
  ): Promise<Qna> {
    console.log(typeof id);
    // console.log('controller : ' + updateContentDto);
    return this.qnasService.update(+id, updateQnaDto);
  }

  @Delete('/:id')
  delete(
    @Param('id', ParseIntPipe) id,
    //@GetUser() user:User
  ): Promise<void> {
    return this.qnasService.delete(id); // , user
  }
}

/*

*/
