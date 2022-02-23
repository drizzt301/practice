import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from 'src/entities/Payment';
import { Repository } from 'typeorm';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
  ) {}

  findAll(): Promise<Payment[]> {
    return this.paymentRepository.find();
  }

  async findOne(id: number): Promise<Payment> {
    const found = await this.paymentRepository.findOne(id);
    //found === null
    if (!found) {
      throw new NotFoundException(`Can't find Payment with id ${id}`);
    }
    return found;
  }

  async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const { stripeChargeId, amount } = createPaymentDto;
    const payment = this.paymentRepository.create({
      stripeChargeId,
      amount,
    });
    payment.timestamp = new Date(); // 현재 타국시간 적용되고 있음
    await this.paymentRepository.save(payment);
    return payment;
  }

  async delete(id: number): Promise<void> {
    const result = await this.paymentRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Payment with id ${id}`);
    }
    console.log(result);
  }

  async update(
    id: number,
    updatePaymentDto: UpdatePaymentDto,
  ): Promise<Payment> {
    const payment = await this.findOne(id);

    console.log(typeof id);

    const { stripeChargeId, amount } = updatePaymentDto;
    payment.stripeChargeId = stripeChargeId;
    payment.amount = amount;
    payment.timestamp = new Date(); // 현재 타국시간 적용되고 있음

    console.log(payment.timestamp);

    await this.paymentRepository.save(payment);
    return payment;
  }
}
