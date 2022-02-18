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
import { Banner } from 'src/entities/Banner';
import { Users } from 'src/entities/Users';
import { BannerStatus } from './banner-status.enum';
import { BannersService } from './banners.service';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { BannerStatusValidationPipe } from './pipes/banner-status-validation.pipe';

@Controller('banners')
export class BannersController {
  private logger = new Logger('Banners');
  constructor(private bannersService: BannersService) {}

  @Post()
  create(@Body() createBannerDto: CreateBannerDto): Promise<Banner> {
    return this.bannersService.create(createBannerDto);
  }

  @Get()
  findAll(): Promise<Banner[]> {
    this.logger.verbose(`User trying to get all banners`);
    return this.bannersService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: number): Promise<Banner> {
    return this.bannersService.findOne(id);
  }

  @Patch('/:id')
  update(
    @Param('id') id: string,
    @Body() updateBannerDto: UpdateBannerDto,
  ): Promise<Banner> {
    console.log(typeof id);
    // console.log('controller : ' + updateBannerDto);
    return this.bannersService.update(+id, updateBannerDto);
  }

  @Delete('/:id')
  delete(
    @Param('id', ParseIntPipe) id,
    //@GetUser() user:User
  ): Promise<void> {
    return this.bannersService.delete(id); // , user
  }
}

/*
  @Get()
  getAllBoard(@GetUser() user: Users): Promise<Banner[]> {
    this.logger.verbose(
      `User ${user.firstName} ${user.lastName} trying to get all banners`,
    );
    return this.boardsService.getAllBanners(user);
  }

    @Patch('/:id')
  updateBanner(
    @Param('id', ParseIntPipe) id,
    @Body() updateBannerDto: UpdateBannerDto,
  ): Promise<Banner> {
    this.logger.verbose(`User updating a new banner. 
      Payload: ${JSON.stringify(updateBannerDto)} `);
    return this.bannersService.updateBanner(updateBannerDto);
  }

    @Patch('/:id/status')
  updateBannerStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BannerStatusValidationPipe) status: BannerStatus,
  ) {
    return this.bannersService.updateBoardStatus(id); // , status
  }

    @Post()
  //@UsePipes(BannerStatusValidationPipe)
  createBanner(@Body() createBannerDto: CreateBannerDto): Promise<Banner> {
    // @GetUser() user:User
    this.logger.verbose(`User creating a new banner. 
      Payload: ${JSON.stringify(createBannerDto)} `); // ${user.username}
    return this.bannersService.createBanner(createBannerDto); //, user
  }
*/
