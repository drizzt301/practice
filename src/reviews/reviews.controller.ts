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
import { ReviewStatusValidationPipe } from './pipes/review-status-validation.pipe';

@Controller('reviews')
export class ReviewsController {
  private logger = new Logger('Boards');
  constructor(private reviewsService: ReviewsService) {}

  @Get()
  getAllBoard(): Promise<Review[]> {
    this.logger.verbose(`User trying to get all reviews`);
    return this.reviewsService.getAllReviews();
  }

  @Post()
  @UsePipes(ReviewStatusValidationPipe)
  createReview(@Body() createReviewDto: CreateReviewDto): Promise<Review> {
    // @GetUser() user:User
    this.logger.verbose(`User creating a new board. 
      Payload: ${JSON.stringify(createReviewDto)} `); // ${user.username}
    return this.reviewsService.createReview(createReviewDto); //, user
  }

  @Get('/:id')
  getReviewById(@Param('id') id: number): Promise<Review> {
    return this.reviewsService.getReviewById(id);
  }

  @Delete('/:id')
  deleteReview(
    @Param('id', ParseIntPipe) id,
    //@GetUser() user:User
  ): Promise<void> {
    return this.reviewsService.deleteReview(id); // , user
  }

  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', ReviewStatusValidationPipe) status: ReviewStatus,
  ) {
    return this.reviewsService.updateBoardStatus(id); // , status
  }
}

/*
  @Get()
  getAllBoard(@GetUser() user: Users): Promise<Review[]> {
    this.logger.verbose(
      `User ${user.firstName} ${user.lastName} trying to get all reviews`,
    );
    return this.boardsService.getAllReviews(user);
  }
*/
