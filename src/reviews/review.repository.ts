import { Review } from 'src/entities/Review';
import { Users } from 'src/entities/Users';
import { EntityRepository, Repository } from 'typeorm';
import { ReviewStatus } from './review-status.enum';
import { CreateReviewDto } from './dto/create-review.dto';

@EntityRepository(Review)
export class ReviewRepository extends Repository<Review> {
  async createReview(
    createReviewDto: CreateReviewDto,
    //user: Users,
  ): Promise<Review> {
    const { title, content } = createReviewDto;

    const review = this.create({
      title,
      content,
      //status: ReviewStatus.PUBLIC,
      //user,
    });

    await this.save(review);
    return review;
  }
}
