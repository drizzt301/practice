import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from 'src/entities/Review';
import { ReviewRepository } from './review.repository';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(ReviewRepository)
    private reviewRepository: ReviewRepository,
  ) {}

  async getAllReviews(): Promise<Review[]> {
    const query = this.reviewRepository.createQueryBuilder('review');
    //query.where('board.userId = :userId', { userId: user.id });
    const reviews = await query.getMany();

    return reviews;
  }

  createReview(createReviewDto: CreateReviewDto): Promise<Review> {
    // , user: User
    return this.reviewRepository.createReview(createReviewDto); // , user
  }

  async getReviewById(id: number): Promise<Review> {
    const found = await this.reviewRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Can't find Review with id ${id}`);
    }

    return found;
  }

  async deleteReview(id: number): Promise<void> {
    // , user: User
    const result = await this.reviewRepository.delete({ id }); // , user

    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Review with id ${id}`);
    }
  }

  async updateBoardStatus(id: number): Promise<Review> {
    //, status: ReviewStatus
    const review = await this.getReviewById(id);

    //review.status = status;
    await this.reviewRepository.save(review);

    return review;
  }
}
