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
import { ProductStatusValidationPipe } from './pipes/product-status-validation.pipe';

@Controller('products')
export class ProductsController {
  private logger = new Logger('Boards');
  constructor(private productsService: ProductsService) {}

  @Get()
  getAllBoard(): Promise<Product[]> {
    this.logger.verbose(`User trying to get all products`);
    return this.productsService.getAllProducts();
  }

  @Post()
  @UsePipes(ProductStatusValidationPipe)
  createProduct(@Body() createProductDto: CreateProductDto): Promise<Product> {
    // @GetUser() user:User
    this.logger.verbose(`User creating a new board. 
      Payload: ${JSON.stringify(createProductDto)} `); // ${user.username}
    return this.productsService.createProduct(createProductDto); //, user
  }

  @Get('/:id')
  getProductById(@Param('id') id: number): Promise<Product> {
    return this.productsService.getProductById(id);
  }

  @Delete('/:id')
  deleteProduct(
    @Param('id', ParseIntPipe) id,
    //@GetUser() user:User
  ): Promise<void> {
    return this.productsService.deleteProduct(id); // , user
  }

  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', ProductStatusValidationPipe) status: ProductStatus,
  ) {
    return this.productsService.updateBoardStatus(id); // , status
  }
}

/*
  @Get()
  getAllBoard(@GetUser() user: Users): Promise<Product[]> {
    this.logger.verbose(
      `User ${user.firstName} ${user.lastName} trying to get all products`,
    );
    return this.boardsService.getAllProducts(user);
  }
*/
