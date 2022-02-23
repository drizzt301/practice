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
import { ContentFaq as Faq } from 'src/entities/ContentFaq';
import { Users } from 'src/entities/Users';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';
import { FaqsService } from './faqs.service';

@Controller('content/faqs')
export class FaqsController {
  private logger = new Logger('ContentFaqs');
  constructor(private faqsService: FaqsService) {}

  @Post()
  create(@Body() createFaqDto: CreateFaqDto): Promise<Faq> {
    return this.faqsService.create(createFaqDto);
  }

  @Get()
  findAll(): Promise<Faq[]> {
    this.logger.verbose(`User trying to get all ContentFaqs`);
    return this.faqsService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: number): Promise<Faq> {
    return this.faqsService.findOne(id);
  }

  @Patch('/:id')
  update(
    @Param('id') id: string,
    @Body() updateFaqDto: UpdateFaqDto,
  ): Promise<Faq> {
    console.log(typeof id);
    // console.log('controller : ' + updateContentDto);
    return this.faqsService.update(+id, updateFaqDto);
  }

  @Delete('/:id')
  delete(
    @Param('id', ParseIntPipe) id,
    //@GetUser() user:User
  ): Promise<void> {
    return this.faqsService.delete(id); // , user
  }
}

/*

*/
