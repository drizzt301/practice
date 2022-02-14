import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressRepository } from './address.repository';
import { AddressesController } from './addresses.controller';
import { AddressesService } from './addresses.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([AddressRepository]),
    // AuthModule
  ],
  controllers: [AddressesController],
  providers: [AddressesService],
})
export class AddressesModule {}
