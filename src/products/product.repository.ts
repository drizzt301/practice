import { Product } from 'src/entities/Product';
import { Users } from 'src/entities/Users';
import { EntityRepository, Repository } from 'typeorm';
import { ProductStatus } from './product-status.enum';
import { CreateProductDto } from './dto/create-product.dto';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  async createProduct(
    createProductDto: CreateProductDto,
    //user: Users,
  ): Promise<Product> {
    const { name, description } = createProductDto;

    const product = this.create({
      name,
      description,
      //status: ProductStatus.PUBLIC,
      //user,
    });

    await this.save(product);
    return product;
  }
}
