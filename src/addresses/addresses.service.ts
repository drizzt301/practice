import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from 'src/entities/Address';
import { AddressRepository } from './address.repository';
import { CreateAddressDto } from './dto/create-address.dto';

@Injectable()
export class AddressesService {
  constructor(
    @InjectRepository(AddressRepository)
    private addressRepository: AddressRepository,
  ) {}

  async getAllAddresses(): Promise<Address[]> {
    const query = this.addressRepository.createQueryBuilder('address');
    //query.where('board.userId = :userId', { userId: user.id });
    const addresses = await query.getMany();

    return addresses;
  }

  createAddress(createAddressDto: CreateAddressDto): Promise<Address> {
    // , user: User
    return this.addressRepository.createAddress(createAddressDto); // , user
  }

  async getAddressById(id: number): Promise<Address> {
    const found = await this.addressRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Can't find Address with id ${id}`);
    }

    return found;
  }

  async deleteAddress(id: number): Promise<void> {
    // , user: User
    const result = await this.addressRepository.delete({ id }); // , user

    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Address with id ${id}`);
    }
  }

  async updateBoardStatus(id: number): Promise<Address> {
    //, status: AddressStatus
    const address = await this.getAddressById(id);

    //address.status = status;
    await this.addressRepository.save(address);

    return address;
  }
}
