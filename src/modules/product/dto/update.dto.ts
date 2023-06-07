import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateProductDTO {
  @IsOptional()
  @IsNotEmpty({ message: 'O campo name não pode ser vaazio ou null' })
  @IsString()
  @ApiProperty()
  name: string;
}
