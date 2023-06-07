import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateAddressDTO } from 'src/modules/address/dto/create.dto';

export class CreateDestinationDTO {
  @IsNotEmpty({ message: 'O campo name não pode ser vazio ou null.' })
  @IsString()
  @ApiProperty()
  name: string;

  @IsNotEmpty({ message: 'O campo address não pode ser vazio ou null.' })
  @Type(() => CreateAddressDTO)
  @ApiProperty()
  address: CreateAddressDTO;
}
