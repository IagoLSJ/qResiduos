import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';

interface ICreate {
  name: string;
}

interface IUpdate {
  name: string;
}

@Injectable()
export class CategoryRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<any[]> {
    return await this.prismaService.category.findMany({
      include: {
        MaterialType: true,
      },
    });
  }

  async findById(id: string): Promise<any> {
    return await this.prismaService.category.findFirst({
      where: {
        id,
      },
      include: {
        MaterialType: true,
      },
    });
  }

  async findByName(name: string): Promise<any> {
    return await this.prismaService.category.findFirst({
      where: {
        name,
      },
      include: {
        MaterialType: true,
      },
    });
  }

  async create(create: ICreate): Promise<any> {
    return await this.prismaService.category.create({
      data: create,
      include: {
        MaterialType: true,
      },
    });
  }

  async update(id: string, create: IUpdate): Promise<any> {
    return await this.prismaService.category.update({
      where: {
        id,
      },
      data: create,
      include: {
        MaterialType: true,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.category.delete({
      where: {
        id,
      },
    });
  }
}
