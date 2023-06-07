import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateCategoryDTO {
  @IsNotEmpty({ message: 'O campo name não pode ser vazio ou null.' })
  @IsString({ message: 'O valor do campo name precisa ser uma string' })
  @ApiProperty()
  name: string;
}
