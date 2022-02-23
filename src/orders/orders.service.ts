import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/entities/Order';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  findAll(): Promise<Order[]> {
    return this.orderRepository.find();
  }

  async findOne(id: number): Promise<Order> {
    const found = await this.orderRepository.findOne(id);
    //found === null
    if (!found) {
      throw new NotFoundException(`Can't find Order with id ${id}`);
    }
    return found;
  }

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const { isOrdered } = createOrderDto;
    const order = this.orderRepository.create({
      isOrdered,
    });
    order.startDate = new Date(); // 현재 타국시간 적용되고 있음
    await this.orderRepository.save(order);
    return order;
  }

  async delete(id: number): Promise<void> {
    const result = await this.orderRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Order with id ${id}`);
    }
    console.log(result);
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const order = await this.findOne(id);

    console.log(typeof id);

    const { isOrdered } = updateOrderDto;
    order.isOrdered = isOrdered;

    await this.orderRepository.save(order);
    return order;
  }
}
