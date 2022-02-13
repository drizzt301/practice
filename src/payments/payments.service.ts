import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from 'src/entities/Payment';
import { PaymentRepository } from './payment.repository';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(PaymentRepository)
    private paymentRepository: PaymentRepository,
  ) {}

  async getAllPayments(): Promise<Payment[]> {
    const query = this.paymentRepository.createQueryBuilder('payment');
    //query.where('board.userId = :userId', { userId: user.id });
    const payments = await query.getMany();

    return payments;
  }

  createPayment(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    // , user: User
    return this.paymentRepository.createPayment(createPaymentDto); // , user
  }

  async getPaymentById(id: number): Promise<Payment> {
    const found = await this.paymentRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Can't find Payment with id ${id}`);
    }

    return found;
  }

  async deletePayment(id: number): Promise<void> {
    // , user: User
    const result = await this.paymentRepository.delete({ id }); // , user

    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Payment with id ${id}`);
    }
  }

  async updateBoardStatus(id: number): Promise<Payment> {
    //, status: PaymentStatus
    const payment = await this.getPaymentById(id);

    //payment.status = status;
    await this.paymentRepository.save(payment);

    return payment;
  }
}
