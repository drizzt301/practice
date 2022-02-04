import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  CreateCatDto,
  UpdateCatDto,
  ListAllEntities,
} from './dto/create-cat.dto';

@Controller('cats')
export class CatController {
  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    return 'This action adds a new cat';
  }

  @Get()
  findAll(@Query() query: ListAllEntities) {
    return `This action returns all cats (limit: ${query.limit} items)`;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a #${id} cat`;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
}

/*
  @Post()
  //@Header('Cache-Control', 'none')
  //@HttpCode(204)
  create(): string {
    return 'This route uses a wildcard';
  }

    @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    return 'This action adds a new cat';
  }

  @Get()
  //@Redirect('https://nestjs.com', 301)
  findAll(@Req() request: Request): string {
    return 'This action returns all cats';
  }

  @Get('aaa')
  async findAll2(): Promise<any[]> {
    return [];
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    return `This action returns a #${id} cats`;
  }

*/
