import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProductDTO {
  @IsNotEmpty({ message: 'O campo name não pode ser vaazio ou null' })
  @IsString()
  @ApiProperty()
  name: string;
}
