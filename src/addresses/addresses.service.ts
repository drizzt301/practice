import { UpdateAddressDto } from './dto/update-address.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from 'src/entities/Address';
import { Repository } from 'typeorm';
import { CreateAddressDto } from './dto/create-address.dto';

@Injectable()
export class AddressesService {
  constructor(
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
  ) {}

  async getAllAddresses(): Promise<Address[]> {
    const query = this.addressRepository.createQueryBuilder('address');
    //query.where('board.userId = :userId', { userId: user.id });
    const addresses = await query.getMany();

    return addresses;
  }

  async createAddress(createAddressDto: CreateAddressDto): Promise<Address> {
    // , user: User
    const { streetAddress, apartmentAddress, name, zip, etc } =
      createAddressDto;
    const address = this.addressRepository.create({
      streetAddress,
      apartmentAddress,
      name,
      zip,
      etc,
    });
    await this.addressRepository.save(address);
    return address;
  }

  async findOne(id: number): Promise<Address> {
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

  async update(
    id: number,
    updateAddressDto: UpdateAddressDto,
  ): Promise<Address> {
    const address = await this.findOne(id);

    console.log(typeof id);

    const { streetAddress, apartmentAddress, name, zip, etc } =
      updateAddressDto;
    address.streetAddress = streetAddress;
    address.apartmentAddress = apartmentAddress;
    address.name = name;
    address.zip = zip;
    address.etc = etc;

    await this.addressRepository.save(address);
    return address;
  }
}
