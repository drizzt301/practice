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
import { Product } from 'src/entities/Product';
import { Users } from 'src/entities/Users';
import { ProductStatus } from './product-status.enum';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductStatusValidationPipe } from './pipes/product-status-validation.pipe';

@Controller('products')
export class ProductsController {
  private logger = new Logger('Products');
  constructor(private productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll(): Promise<Product[]> {
    this.logger.verbose(`User trying to get all products`);
    return this.productsService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: number): Promise<Product> {
    return this.productsService.findOne(id);
  }

  @Patch('/:id')
  update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    console.log(typeof id);
    // console.log('controller : ' + updateProductDto);
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete('/:id')
  delete(
    @Param('id', ParseIntPipe) id,
    //@GetUser() user:User
  ): Promise<void> {
    return this.productsService.delete(id); // , user
  }
}
