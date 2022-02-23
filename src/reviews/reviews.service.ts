import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from 'src/entities/Review';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
  ) {}

  findAll(): Promise<Review[]> {
    return this.reviewRepository.find();
  }

  async findOne(id: number): Promise<Review> {
    const found = await this.reviewRepository.findOne(id);
    //found === null
    if (!found) {
      throw new NotFoundException(`Can't find Review with id ${id}`);
    }
    return found;
  }

  async create(createReviewDto: CreateReviewDto): Promise<Review> {
    const { title, content, usersId } = createReviewDto;
    const review = this.reviewRepository.create({
      title,
      content,
      usersId,
    });
    await this.reviewRepository.save(review);
    return review;
  }

  async delete(id: number): Promise<void> {
    const result = await this.reviewRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Review with id ${id}`);
    }
    console.log(result);
  }

  async update(id: number, updateReviewDto: UpdateReviewDto): Promise<Review> {
    const review = await this.findOne(id);

    console.log(typeof id);

    const { title, content } = updateReviewDto;
    review.title = title;
    review.content = content;

    await this.reviewRepository.save(review);
    return review;
  }
}
