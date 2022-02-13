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
import { BannerStatusValidationPipe } from './pipes/banner-status-validation.pipe';

@Controller('banners')
export class BannersController {
  private logger = new Logger('Boards');
  constructor(private bannersService: BannersService) {}

  @Get()
  getAllBoard(): Promise<Banner[]> {
    this.logger.verbose(`User trying to get all banners`);
    return this.bannersService.getAllBanners();
  }

  @Post()
  @UsePipes(BannerStatusValidationPipe)
  createBanner(@Body() createBannerDto: CreateBannerDto): Promise<Banner> {
    // @GetUser() user:User
    this.logger.verbose(`User creating a new board. 
      Payload: ${JSON.stringify(createBannerDto)} `); // ${user.username}
    return this.bannersService.createBanner(createBannerDto); //, user
  }

  @Get('/:id')
  getBannerById(@Param('id') id: number): Promise<Banner> {
    return this.bannersService.getBannerById(id);
  }

  @Delete('/:id')
  deleteBanner(
    @Param('id', ParseIntPipe) id,
    //@GetUser() user:User
  ): Promise<void> {
    return this.bannersService.deleteBanner(id); // , user
  }

  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BannerStatusValidationPipe) status: BannerStatus,
  ) {
    return this.bannersService.updateBoardStatus(id); // , status
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
*/
