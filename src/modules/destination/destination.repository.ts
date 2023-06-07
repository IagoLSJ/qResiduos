import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { DestinationEntity } from './destination.entity';

interface ICreate {
  name: string;
  addressId: string;
}

interface IUpdate {
  name: string;
  addressId: string;
}

@Injectable()
export class DestinationRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async findAll(): Promise<DestinationEntity[]> {
    return await this.prismaService.destination.findMany({
      include: {
        Address: true,
      },
    });
  }

  async findById(id: string): Promise<DestinationEntity | undefined> {
    return this.prismaService.destination.findFirst({
      where: {
        id,
      },
      include: {
        Address: true,
      },
    });
  }

  async findByName(name: string): Promise<DestinationEntity | undefined> {
    return this.prismaService.destination.findFirst({
      where: {
        name,
      },
      include: {
        Address: true,
      },
    });
  }

  async create(createDestination: ICreate): Promise<DestinationEntity> {
    return this.prismaService.destination.create({
      data: createDestination,
      include: {
        Address: true,
      },
    });
  }

  async update(
    id: string,
    updateDestination: Partial<IUpdate>,
  ): Promise<DestinationEntity> {
    return await this.prismaService.destination.update({
      where: {
        id,
      },
      data: updateDestination,
      include: {
        Address: true,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.destination.delete({
      where: {
        id,
      },
    });
  }
}
