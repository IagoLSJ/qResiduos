import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { ProductEntity } from './product.entity';

interface IData {
  name: string;
}

@Injectable()
export class ProductRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<ProductEntity[]> {
    return await this.prismaService.product.findMany();
  }

  async findById(id: string): Promise<ProductEntity | undefined> {
    return await this.prismaService.product.findFirst({
      where: {
        id,
      },
    });
  }

  async findByName(name: string): Promise<ProductEntity | undefined> {
    return await this.prismaService.product.findFirst({
      where: {
        name,
      },
    });
  }

  async create(create: IData): Promise<ProductEntity> {
    return await this.prismaService.product.create({
      data: create,
    });
  }

  async update(id: string, update: IData): Promise<ProductEntity> {
    return await this.prismaService.product.update({
      where: {
        id,
      },
      data: update,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.product.delete({
      where: {
        id,
      },
    });
  }
}
