import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { AddressEntity } from './address.entity';

interface ICreateAddress {
  street: string;
  neighborhood: string;
  number: number;
  city: string;
  state: string;
  cep: string;
}

interface IUpdateAddress {
  street: string;
  neighborhood: string;
  number: number;
  city: string;
  state: string;
  cep: string;
}

@Injectable()
export class AddressRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<AddressEntity[]> {
    return await this.prismaService.address.findMany();
  }

  async findById(id: string): Promise<AddressEntity | null> {
    return await this.prismaService.address.findFirst({
      where: {
        id,
      },
    });
  }

  async create(createdAddress: ICreateAddress): Promise<AddressEntity> {
    return await this.prismaService.address.create({
      data: createdAddress,
    });
  }

  async update(
    addressId: string,
    updatedAddress: Partial<IUpdateAddress>,
  ): Promise<AddressEntity> {
    return await this.prismaService.address.update({
      where: {
        id: addressId,
      },
      data: updatedAddress,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.address.delete({
      where: {
        id,
      },
    });
  }
}
