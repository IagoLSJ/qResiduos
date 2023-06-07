import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { UserEntity } from './user.entity';

interface ICreateUser {
  email: string;
  username: string;
  password: string;
  cpf: string;
  telephone: string;
}

interface IUpdateUser {
  email: string;
  username: string;
  password: string;
  telephone: string;
}

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<UserEntity[]> {
    return await this.prismaService.users.findMany();
  }

  async findById(id: string): Promise<UserEntity | null> {
    return await this.prismaService.users.findFirst({
      where: {
        id,
      },
    });
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    return await this.prismaService.users.findFirst({
      where: {
        email,
      },
    });
  }

  async create(createdUser: ICreateUser): Promise<UserEntity> {
    return await this.prismaService.users.create({
      data: createdUser,
    });
  }

  async update(
    userId: string,
    updatedUser: Partial<IUpdateUser>,
  ): Promise<UserEntity> {
    return await this.prismaService.users.update({
      where: {
        id: userId,
      },
      data: updatedUser,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.users.delete({
      where: {
        id,
      },
    });
  }
}
