import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { ExitType } from './enum/exitType';

interface ICreate {
  providerId: string;
  productId: string;
  destinationId?: string;
  observation: string;
  exitType: ExitType;
  productQuantity: number;
}

interface IUpdate {
  observation: string;
  productQuantity: number;
}

@Injectable()
export class ExitRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<any[]> {
    return await this.prismaService.exit.findMany();
  }

  async findById(id: string): Promise<any | undefined> {
    return await this.prismaService.exit.findFirst({
      where: {
        id,
      },
    });
  }

  async create(create: ICreate): Promise<any> {
    return await this.prismaService.exit.create({
      data: {
        providerId: create.providerId,
        destinationId: create.destinationId,
        productId: create.productId,
        observation: create.observation,
        materialItems: null,
        exitType: create.exitType.toString(),
        productQuantity: create.productQuantity,
        code: 'ckndlsf',
      },
    });
  }

  async update(id: string, create: Partial<IUpdate>): Promise<any> {
    return await this.prismaService.exit.update({
      where: {
        id,
      },
      data: create,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.exit.delete({
      where: {
        id,
      },
    });
  }
}
