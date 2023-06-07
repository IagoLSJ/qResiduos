import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { PaperEntity } from './paper.entity';

interface ICreate {
  name: string;
  description: string;
}

interface IUpdate {
  name: string;
  description: string;
}

@Injectable()
export class PaperRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<PaperEntity[]> {
    return await this.prismaService.paper.findMany();
  }

  async findById(id: string): Promise<PaperEntity | undefined> {
    return await this.prismaService.paper.findFirst({
      where: {
        id,
      },
    });
  }

  async findByName(name: string): Promise<PaperEntity | undefined> {
    return await this.prismaService.paper.findFirst({
      where: {
        name,
      },
    });
  }

  async create(create: ICreate): Promise<PaperEntity> {
    return await this.prismaService.paper.create({
      data: create,
    });
  }

  async update(id: string, create: Partial<IUpdate>): Promise<PaperEntity> {
    return await this.prismaService.paper.update({
      where: {
        id,
      },
      data: create,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.paper.delete({
      where: {
        id,
      },
    });
  }
}
