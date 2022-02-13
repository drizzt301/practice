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
import { PaymentStatusValidationPipe } from './pipes/payment-status-validation.pipe';

@Controller('payments')
export class PaymentsController {
  private logger = new Logger('Boards');
  constructor(private paymentsService: PaymentsService) {}

  @Get()
  getAllBoard(): Promise<Payment[]> {
    this.logger.verbose(`User trying to get all payments`);
    return this.paymentsService.getAllPayments();
  }

  @Post()
  @UsePipes(PaymentStatusValidationPipe)
  createPayment(@Body() createPaymentDto: CreatePaymentDto): Promise<Payment> {
    // @GetUser() user:User
    this.logger.verbose(`User creating a new board. 
      Payload: ${JSON.stringify(createPaymentDto)} `); // ${user.username}
    return this.paymentsService.createPayment(createPaymentDto); //, user
  }

  @Get('/:id')
  getPaymentById(@Param('id') id: number): Promise<Payment> {
    return this.paymentsService.getPaymentById(id);
  }

  @Delete('/:id')
  deletePayment(
    @Param('id', ParseIntPipe) id,
    //@GetUser() user:User
  ): Promise<void> {
    return this.paymentsService.deletePayment(id); // , user
  }

  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', PaymentStatusValidationPipe) status: PaymentStatus,
  ) {
    return this.paymentsService.updateBoardStatus(id); // , status
  }
}

/*
  @Get()
  getAllBoard(@GetUser() user: Users): Promise<Payment[]> {
    this.logger.verbose(
      `User ${user.firstName} ${user.lastName} trying to get all payments`,
    );
    return this.boardsService.getAllPayments(user);
  }
*/
