import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/Product';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async findOne(id: number): Promise<Product> {
    const found = await this.productRepository.findOne(id);
    //found === null
    if (!found) {
      throw new NotFoundException(`Can't find Product with id ${id}`);
    }
    return found;
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const { name, description, slug, thumbnail } = createProductDto;
    const product = this.productRepository.create({
      name,
      description,
      slug,
      thumbnail,
    });
    await this.productRepository.save(product);
    return product;
  }

  async delete(id: number): Promise<void> {
    const result = await this.productRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Product with id ${id}`);
    }
    console.log(result);
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.findOne(id);

    console.log(typeof id);

    const { name, description, slug, thumbnail } = updateProductDto;
    product.name = name;
    product.description = description;
    product.slug = slug;
    product.thumbnail = thumbnail;

    await this.productRepository.save(product);
    return product;
  }
}
