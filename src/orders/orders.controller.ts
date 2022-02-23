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
import { Order } from 'src/entities/Order';
import { Users } from 'src/entities/Users';
import { OrderStatus } from './order-status.enum';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderStatusValidationPipe } from './pipes/order-status-validation.pipe';

@Controller('orders')
export class OrdersController {
  private logger = new Logger('Orders');
  constructor(private ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  findAll(): Promise<Order[]> {
    this.logger.verbose(`User trying to get all orders`);
    return this.ordersService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: number): Promise<Order> {
    return this.ordersService.findOne(id);
  }

  @Patch('/:id')
  update(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ): Promise<Order> {
    console.log(typeof id);
    // console.log('controller : ' + updateOrderDto);
    return this.ordersService.update(+id, updateOrderDto);
  }

  @Delete('/:id')
  delete(
    @Param('id', ParseIntPipe) id,
    //@GetUser() user:User
  ): Promise<void> {
    return this.ordersService.delete(id); // , user
  }
}
