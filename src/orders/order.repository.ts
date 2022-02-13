import { Order } from 'src/entities/Order';
import { Users } from 'src/entities/Users';
import { EntityRepository, Repository } from 'typeorm';
import { OrderStatus } from './order-status.enum';
import { CreateOrderDto } from './dto/create-order.dto';

@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {
  async createOrder(
    createOrderDto: CreateOrderDto,
    //user: Users,
  ): Promise<Order> {
    const { id, createdAt, state, users } = createOrderDto;

    const order = this.create({
      createdAt,
      //status: OrderStatus.PUBLIC,
      //user,
    });

    await this.save(order);
    return order;
  }
}
