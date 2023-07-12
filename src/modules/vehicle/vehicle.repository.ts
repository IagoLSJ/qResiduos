import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { VehicleEntity } from './vehicle.entity';

interface IData {
  name: string;
  placa: string;
}
@Injectable()
export class VehicleRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<VehicleEntity[]> {
    return await this.prismaService.vehicle.findMany();
  }

  async findById(id: string): Promise<VehicleEntity | undefined> {
    return await this.prismaService.vehicle.findFirst({
      where: {
        id,
      },
    });
  }

  async findByPlaca(placa: string): Promise<VehicleEntity | undefined> {
    return await this.prismaService.vehicle.findUnique({
      where: {
        placa,
      },
    });
  }

  async create(createProvider: IData): Promise<VehicleEntity> {
    return await this.prismaService.vehicle.create({
      data: createProvider,
    });
  }

  async update(
    id: string,
    updateProvider: Partial<IData>,
  ): Promise<VehicleEntity> {
    return await this.prismaService.vehicle.update({
      where: {
        id,
      },
      data: updateProvider,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.vehicle.delete({
      where: {
        id,
      },
    });
  }
}
