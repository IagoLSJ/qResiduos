import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { ProviderEntity } from './provider.entity';

interface ICreateProvider {
  username: string;
  email: string;
  cpf: string;
  telephone: string;
  addressId: string;
}

interface IUpdateProvider {
  username: string;
  email: string;
  telephone: string;
  addressId: string;
}
@Injectable()
export class ProviderRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<ProviderEntity[]> {
    return await this.prismaService.provider.findMany({
      include: {
        Address: true,
      },
    });
  }

  async findById(id: string): Promise<ProviderEntity | undefined> {
    return await this.prismaService.provider.findFirst({
      where: {
        id,
      },
      include: {
        Address: true,
      },
    });
  }

  async findByEmail(email: string): Promise<ProviderEntity | undefined> {
    return await this.prismaService.provider.findUnique({
      where: {
        email,
      },
      include: {
        Address: true,
      },
    });
  }

  async create(createProvider: ICreateProvider): Promise<ProviderEntity> {
    return await this.prismaService.provider.create({
      data: createProvider,
      include: {
        Address: true,
      },
    });
  }

  async update(
    id: string,
    updateProvider: Partial<IUpdateProvider>,
  ): Promise<ProviderEntity> {
    return await this.prismaService.provider.update({
      where: {
        id,
      },
      data: updateProvider,
      include: {
        Address: true,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.provider.delete({
      where: {
        id,
      },
    });
  }
}
