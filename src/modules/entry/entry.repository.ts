import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';

interface ICreate {
  providerId: string;
  destinationId: string;
  observation: string;
  fileUrl?: string;
}

interface IUpdate {
  observation: string;
}

@Injectable()
export class EntryRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<any[]> {
    return await this.prismaService.entry.findMany({
      include: {
        fornecedor: true,
        destination: true,
        materialItems: true,
      },
    });
  }

  async findById(id: string): Promise<any | undefined> {
    return await this.prismaService.entry.findFirst({
      where: {
        id,
      },
      include: {
        fornecedor: true,
        destination: true,
        materialItems: true,
      },
    });
  }

  async create(create: ICreate): Promise<any> {
    return await this.prismaService.entry.create({
      data: {
        providerId: create.providerId,
        destinationId: create.destinationId,
        observation: create.observation,
        fileUrl: create.fileUrl,
      },
      include: {
        fornecedor: true,
        destination: true,
        materialItems: true,
      },
    });
  }

  async update(id: string, create: Partial<IUpdate>): Promise<any> {
    return await this.prismaService.entry.update({
      where: {
        id,
      },
      data: create,
      include: {
        fornecedor: true,
        destination: true,
        materialItems: true,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.entry.delete({
      where: {
        id,
      },
    });
  }
}
