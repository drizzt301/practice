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
import { Payment } from 'src/entities/Payment';
import { Users } from 'src/entities/Users';
import { PaymentStatus } from './payment-status.enum';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { PaymentStatusValidationPipe } from './pipes/payment-status-validation.pipe';

@Controller('payments')
export class PaymentsController {
  private logger = new Logger('Payments');
  constructor(private paymentsService: PaymentsService) {}

  @Post()
  create(@Body() createPaymentDto: CreatePaymentDto): Promise<Payment> {
    return this.paymentsService.create(createPaymentDto);
  }

  @Get()
  findAll(): Promise<Payment[]> {
    this.logger.verbose(`User trying to get all payments`);
    return this.paymentsService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: number): Promise<Payment> {
    return this.paymentsService.findOne(id);
  }

  @Patch('/:id')
  update(
    @Param('id') id: string,
    @Body() updatePaymentDto: UpdatePaymentDto,
  ): Promise<Payment> {
    console.log(typeof id);
    // console.log('controller : ' + updatePaymentDto);
    return this.paymentsService.update(+id, updatePaymentDto);
  }

  @Delete('/:id')
  delete(
    @Param('id', ParseIntPipe) id,
    //@GetUser() user:User
  ): Promise<void> {
    return this.paymentsService.delete(id); // , user
  }
}
