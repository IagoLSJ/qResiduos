import { Injectable } from '@nestjs/common';
import { CreateAddressDTO } from './dto/create.dto';
import { UpdateAddressDTO } from './dto/update.dto';
import { AddressRepository } from './address.repository';

@Injectable()
export class AddressService {
  constructor(private readonly addressRepository: AddressRepository) {}
  async findAll() {
    return await this.addressRepository.findAll();
  }

  async findById(id: string) {
    return await this.addressRepository.findById(id);
  }

  async create(createAddressDto: CreateAddressDTO) {
    return await this.addressRepository.create(createAddressDto);
  }

  async update(id: string, updateAddressDto: UpdateAddressDTO) {
    return await this.addressRepository.update(id, updateAddressDto);
  }

  async delete(id: string) {
    await this.addressRepository.delete(id);
  }
}
