import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';

interface IDate {
  name: string;
  cnh: string;
  vehicleId: string;
}

@Injectable()
export class DriverRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<any[]> {
    return await this.prismaService.driver.findMany({
      include: {
        vehicle: true,
      },
    });
  }

  async findById(id: string): Promise<any> {
    return await this.prismaService.driver.findFirst({
      where: {
        id,
      },
      include: {
        vehicle: true,
      },
    });
  }

  async findByCNH(cnh: string): Promise<any> {
    return await this.prismaService.driver.findFirst({
      where: {
        cnh,
      },
      include: {
        vehicle: true,
      },
    });
  }

  async create(create: IDate): Promise<any> {
    return await this.prismaService.driver.create({
      data: create,
    });
  }

  async update(id: string, update: IDate): Promise<any> {
    return await this.prismaService.driver.update({
      where: {
        id,
      },
      data: update,
    });
  }
  
  async delete(id: string): Promise<void> {
    await this.prismaService.driver.delete({
      where: {
        id,
      },
    });
  }
}
