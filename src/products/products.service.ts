import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/Product';
import { ProductRepository } from './product.repository';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductRepository)
    private productRepository: ProductRepository,
  ) {}

  async getAllProducts(): Promise<Product[]> {
    const query = this.productRepository.createQueryBuilder('product');
    //query.where('board.userId = :userId', { userId: user.id });
    const products = await query.getMany();

    return products;
  }

  createProduct(createProductDto: CreateProductDto): Promise<Product> {
    // , user: User
    return this.productRepository.createProduct(createProductDto); // , user
  }

  async getProductById(id: number): Promise<Product> {
    const found = await this.productRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Can't find Product with id ${id}`);
    }

    return found;
  }

  async deleteProduct(id: number): Promise<void> {
    // , user: User
    const result = await this.productRepository.delete({ id }); // , user

    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Product with id ${id}`);
    }
  }

  async updateBoardStatus(id: number): Promise<Product> {
    //, status: ProductStatus
    const product = await this.getProductById(id);

    //product.status = status;
    await this.productRepository.save(product);

    return product;
  }
}
