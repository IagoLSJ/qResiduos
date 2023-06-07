import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPostalCode, IsString } from 'class-validator';

export class CreateAddressDTO {
  @IsNotEmpty({ message: 'O campo street não pode ser vazio ou null.' })
  @IsString()
  @ApiProperty()
  street: string;

  @IsNotEmpty({ message: 'O campo neighborhood não pode ser vazio ou null.' })
  @IsString()
  @ApiProperty()
  neighborhood: string;

  @IsNotEmpty({ message: 'O number neighborhood não pode ser vazio ou null.' })
  @IsNumber()
  @ApiProperty()
  number: number;

  @IsNotEmpty({ message: 'O city neighborhood não pode ser vazio ou null.' })
  @IsString()
  @ApiProperty()
  city: string;

  @IsNotEmpty({ message: 'O city state não pode ser vazio ou null.' })
  @IsString()
  @ApiProperty()
  state: string;

  @IsNotEmpty({ message: 'O cep state não pode ser vazio ou null.' })
  @IsString()
  @IsPostalCode()
  @ApiProperty()
  cep: string;
}
