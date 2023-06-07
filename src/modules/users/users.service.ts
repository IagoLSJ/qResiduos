import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/create.user.dto';
import { UpdateUserDTO } from './dto/update.user.dto';
import { UserRepository } from './users.repository';
import AppError from 'src/shared/Error/AppError';
import { hashSync } from 'bcrypt';
import { ReturnUserDTO } from './dto/return.user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll(): Promise<ReturnUserDTO[]> {
    const users = await this.userRepository.findAll();

    const userWithReturnDTO = users.map((item) => {
      return new ReturnUserDTO(
        item.id,
        item.email,
        item.username,
        item.cpf,
        item.telephone,
      );
    });

    return userWithReturnDTO;
  }

  async findById(id: string): Promise<ReturnUserDTO> {
    const userById = await this.userRepository.findById(id);

    if (!userById) {
      throw new AppError('Usuário não existe');
    }

    return new ReturnUserDTO(
      userById.id,
      userById.email,
      userById.username,
      userById.cpf,
      userById.telephone,
    );
  }

  async findByEmail(email: string): Promise<ReturnUserDTO> {
    const userByEmail = await this.userRepository.findByEmail(email);

    if (userByEmail) {
      throw new AppError('E-mail não existe');
    }

    return new ReturnUserDTO(
      userByEmail.id,
      userByEmail.email,
      userByEmail.username,
      userByEmail.cpf,
      userByEmail.telephone,
    );
  }

  async create(createUserDto: CreateUserDTO): Promise<ReturnUserDTO> {
    const userByEmail = await this.userRepository.findByEmail(
      createUserDto.email,
    );

    if (userByEmail) {
      throw new AppError('E-mail já cadastrado');
    }

    const hashPassword = hashSync(createUserDto.password, 10);
    createUserDto.password = hashPassword;

    const userCreated = await this.userRepository.create(createUserDto);

    return new ReturnUserDTO(
      userCreated.id,
      userCreated.email,
      userCreated.username,
      userCreated.cpf,
      userCreated.telephone,
    );
  }

  async update(
    id: string,
    updateUserDTO: UpdateUserDTO,
  ): Promise<ReturnUserDTO> {
    const userById = await this.userRepository.findById(id);

    if (!userById) {
      throw new AppError('Usuário não existe');
    }

    const userUpdated = await this.userRepository.update(
      userById.id,
      updateUserDTO,
    );

    return new ReturnUserDTO(
      userUpdated.id,
      userUpdated.email,
      userUpdated.username,
      userUpdated.cpf,
      userUpdated.telephone,
    );
  }

  async delete(id: string) {
    const userById = await this.userRepository.findById(id);

    if (!userById) {
      throw new AppError('Usuário não existe');
    }

    await this.userRepository.delete(id);
  }
}
