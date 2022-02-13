import { Payment } from 'src/entities/Payment';
import { Users } from 'src/entities/Users';
import { EntityRepository, Repository } from 'typeorm';
import { PaymentStatus } from './payment-status.enum';
import { CreatePaymentDto } from './dto/create-payment.dto';

@EntityRepository(Payment)
export class PaymentRepository extends Repository<Payment> {
  async createPayment(
    createPaymentDto: CreatePaymentDto,
    //user: Users,
  ): Promise<Payment> {
    const { stripeChargeId, amount } = createPaymentDto;

    const payment = this.create({
      stripeChargeId,
      amount,
      //status: PaymentStatus.PUBLIC,
      //user,
    });

    await this.save(payment);
    return payment;
  }
}
