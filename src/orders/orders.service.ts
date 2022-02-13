import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/entities/Order';
import { OrderRepository } from './order.repository';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderRepository)
    private orderRepository: OrderRepository,
  ) {}

  async getAllOrders(): Promise<Order[]> {
    const query = this.orderRepository.createQueryBuilder('order');
    //query.where('board.userId = :userId', { userId: user.id });
    const orders = await query.getMany();

    return orders;
  }

  createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    // , user: User
    return this.orderRepository.createOrder(createOrderDto); // , user
  }

  async getOrderById(id: number): Promise<Order> {
    const found = await this.orderRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Can't find Order with id ${id}`);
    }

    return found;
  }

  async deleteOrder(id: number): Promise<void> {
    // , user: User
    const result = await this.orderRepository.delete({ id }); // , user

    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Order with id ${id}`);
    }
  }

  async updateBoardStatus(id: number): Promise<Order> {
    //, status: OrderStatus
    const order = await this.getOrderById(id);

    //order.status = status;
    await this.orderRepository.save(order);

    return order;
  }
}
