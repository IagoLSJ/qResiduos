import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { UpdateAddressDTO } from 'src/modules/address/dto/update.dto';

export class UpdateProviderDTO {
  @IsOptional()
  @IsNotEmpty({ message: 'O campo username não pode ser vazio ou null.' })
  @IsString()
  @ApiProperty()
  username: string;

  @IsOptional()
  @IsNotEmpty({ message: 'O campo email não pode ser vazio ou null.' })
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsOptional()
  @IsNotEmpty({ message: 'O campo telephone não pode ser vazio ou null.' })
  @IsPhoneNumber()
  @ApiProperty()
  telephone: string;

  @IsOptional()
  @Type(() => UpdateAddressDTO)
  @ApiProperty()
  address: UpdateAddressDTO;
}
