import { Address } from 'src/entities/Address';
import { Users } from 'src/entities/Users';
import { EntityRepository, Repository } from 'typeorm';
import { AddressStatus } from './address-status.enum';
import { CreateAddressDto } from './dto/create-address.dto';

@EntityRepository(Address)
export class AddressRepository extends Repository<Address> {
  async createAddress(
    createAddressDto: CreateAddressDto,
    //user: Users,
  ): Promise<Address> {
    const { streetAddress, apartmentAddress } = createAddressDto;

    const address = this.create({
      streetAddress,
      apartmentAddress,
      //status: AddressStatus.PUBLIC,
      //user,
    });

    await this.save(address);
    return address;
  }
}
