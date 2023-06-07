import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';
import { CreateAddressDTO } from 'src/modules/address/dto/create.dto';

export class CreateProviderDTO {
  @IsNotEmpty({ message: 'O campo username não pode ser vazio ou null.' })
  @IsString()
  @ApiProperty()
  username: string;

  @IsNotEmpty({ message: 'O campo email não pode ser vazio ou null.' })
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty({ message: 'O campo cpf não pode ser vazio ou null.' })
  @IsString()
  @ApiProperty()
  cpf: string;

  @IsNotEmpty({ message: 'O campo telephone não pode ser vazio ou null.' })
  @IsPhoneNumber('BR')
  @ApiProperty()
  telephone: string;

  @IsNotEmpty({ message: 'O campo address não pode ser vazio ou null.' })
  @Type(() => CreateAddressDTO)
  @ApiProperty()
  address: CreateAddressDTO;
}
