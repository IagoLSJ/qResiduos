import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPostalCode,
  IsString,
} from 'class-validator';

export class UpdateAddressDTO {
  @IsOptional()
  @IsNotEmpty({ message: 'O campo street não pode ser vazio ou null.' })
  @IsString()
  @ApiProperty()
  street: string;

  @IsOptional()
  @IsNotEmpty({ message: 'O campo neighborhood não pode ser vazio ou null.' })
  @IsString()
  @ApiProperty()
  neighborhood: string;

  @IsOptional()
  @IsNotEmpty({ message: 'O number neighborhood não pode ser vazio ou null.' })
  @IsNumber()
  @ApiProperty()
  number: number;

  @IsOptional()
  @IsNotEmpty({ message: 'O city neighborhood não pode ser vazio ou null.' })
  @IsString()
  @ApiProperty()
  city: string;

  @IsOptional()
  @IsNotEmpty({ message: 'O city state não pode ser vazio ou null.' })
  @IsString()
  @ApiProperty()
  state: string;

  @IsOptional()
  @IsNotEmpty({ message: 'O cep state não pode ser vazio ou null.' })
  @IsString()
  @IsPostalCode()
  @ApiProperty()
  cep: string;
}
