import { Injectable } from '@nestjs/common';
import { UserRepository } from '../users/users.repository';
import { SinginDTO } from './dto/singin.dto';
import AppError from 'src/shared/Error/AppError';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async singin(singin: SinginDTO) {
    const userByEmail = await this.userRepository.findByEmail(singin.email);

    if (!userByEmail) {
      throw new AppError('E-mail/password incorreto');
    }

    const isCheckPassword = await compare(
      singin.password,
      userByEmail.password,
    );
    console.log(isCheckPassword);
    if (!isCheckPassword) {
      throw new AppError('E-mail/password incorreto');
    }

    const token = this.jwtService.sign(
      { userId: userByEmail.id },
      {
        secret:process.env.SECRET,
        expiresIn: process.env.EXPIRES_IN,
      },
    );
    return token;
  }
}
