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
import { Review } from 'src/entities/Review';
import { Users } from 'src/entities/Users';
import { ReviewStatus } from './review-status.enum';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ReviewStatusValidationPipe } from './pipes/review-status-validation.pipe';

@Controller('reviews')
export class ReviewsController {
  private logger = new Logger('Reviews');
  constructor(private reviewsService: ReviewsService) {}

  @Post()
  create(@Body() createReviewDto: CreateReviewDto): Promise<Review> {
    return this.reviewsService.create(createReviewDto);
  }

  @Get()
  findAll(): Promise<Review[]> {
    this.logger.verbose(`User trying to get all reviews`);
    return this.reviewsService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: number): Promise<Review> {
    return this.reviewsService.findOne(id);
  }

  @Patch('/:id')
  update(
    @Param('id') id: string,
    @Body() updateReviewDto: UpdateReviewDto,
  ): Promise<Review> {
    console.log(typeof id);
    // console.log('controller : ' + updateReviewDto);
    return this.reviewsService.update(+id, updateReviewDto);
  }

  @Delete('/:id')
  delete(
    @Param('id', ParseIntPipe) id,
    //@GetUser() user:User
  ): Promise<void> {
    return this.reviewsService.delete(id); // , user
  }
}
