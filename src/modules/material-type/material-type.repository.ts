import { PrismaService } from 'src/shared/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

interface ICreate {
  name: string;
  categoryId: string;
}

interface IUpdate {
  name: string;
  categoryId: string;
}
@Injectable()
export class MaterialTypeRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<any[]> {
    return await this.prismaService.materialType.findMany({
      include: {
        Category: true,
      },
    });
  }

  async findById(id: string): Promise<any | undefined> {
    return await this.prismaService.materialType.findFirst({
      where: {
        id,
      },
      include: {
        Category: true,
      },
    });
  }

  async findByName(name: string): Promise<any | undefined> {
    return this.prismaService.materialType.findFirst({
      where: {
        name,
      },
      include: {
        Category: true,
      },
    });
  }

  async create(create: ICreate): Promise<any> {
    return await this.prismaService.materialType.create({
      data: {
        name: create.name,
        categoryId: create.categoryId,
      },
      include: {
        Category: true,
      },
    });
  }

  async update(id: string, update: Partial<IUpdate>): Promise<any> {
    return await this.prismaService.materialType.update({
      where: {
        id,
      },
      data: update,
      include: {
        Category: true,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.materialType.delete({
      where: {
        id,
      },
    });
  }
}
