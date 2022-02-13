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
import { OrderStatusValidationPipe } from './pipes/order-status-validation.pipe';

@Controller('orders')
export class OrdersController {
  private logger = new Logger('Boards');
  constructor(private ordersService: OrdersService) {}

  @Get()
  getAllBoard(): Promise<Order[]> {
    this.logger.verbose(`User trying to get all orders`);
    return this.ordersService.getAllOrders();
  }

  @Post()
  @UsePipes(OrderStatusValidationPipe)
  createOrder(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    // @GetUser() user:User
    this.logger.verbose(`User creating a new board. 
      Payload: ${JSON.stringify(createOrderDto)} `); // ${user.username}
    return this.ordersService.createOrder(createOrderDto); //, user
  }

  @Get('/:id')
  getOrderById(@Param('id') id: number): Promise<Order> {
    return this.ordersService.getOrderById(id);
  }

  @Delete('/:id')
  deleteOrder(
    @Param('id', ParseIntPipe) id,
    //@GetUser() user:User
  ): Promise<void> {
    return this.ordersService.deleteOrder(id); // , user
  }

  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', OrderStatusValidationPipe) status: OrderStatus,
  ) {
    return this.ordersService.updateBoardStatus(id); // , status
  }
}

/*
  @Get()
  getAllBoard(@GetUser() user: Users): Promise<Order[]> {
    this.logger.verbose(
      `User ${user.firstName} ${user.lastName} trying to get all orders`,
    );
    return this.boardsService.getAllOrders(user);
  }
*/
