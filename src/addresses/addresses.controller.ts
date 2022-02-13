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
import { Address } from 'src/entities/Address';
import { Users } from 'src/entities/Users';
import { AddressStatus } from './address-status.enum';
import { AddressesService } from './addresses.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { AddressStatusValidationPipe } from './pipes/address-status-validation.pipe';

@Controller('addresses')
export class AddressesController {
  private logger = new Logger('Boards');
  constructor(private addressesService: AddressesService) {}

  @Get()
  getAllBoard(): Promise<Address[]> {
    this.logger.verbose(`User trying to get all addresses`);
    return this.addressesService.getAllAddresses();
  }

  @Post()
  @UsePipes(AddressStatusValidationPipe)
  createAddress(@Body() createAddressDto: CreateAddressDto): Promise<Address> {
    // @GetUser() user:User
    this.logger.verbose(`User creating a new board. 
      Payload: ${JSON.stringify(createAddressDto)} `); // ${user.username}
    return this.addressesService.createAddress(createAddressDto); //, user
  }

  @Get('/:id')
  getAddressById(@Param('id') id: number): Promise<Address> {
    return this.addressesService.getAddressById(id);
  }

  @Delete('/:id')
  deleteAddress(
    @Param('id', ParseIntPipe) id,
    //@GetUser() user:User
  ): Promise<void> {
    return this.addressesService.deleteAddress(id); // , user
  }

  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', AddressStatusValidationPipe) status: AddressStatus,
  ) {
    return this.addressesService.updateBoardStatus(id); // , status
  }
}

/*
  @Get()
  getAllBoard(@GetUser() user: Users): Promise<Address[]> {
    this.logger.verbose(
      `User ${user.firstName} ${user.lastName} trying to get all addresses`,
    );
    return this.boardsService.getAllAddresses(user);
  }
*/
