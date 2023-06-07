import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDTO {
  @IsNotEmpty({ message: 'O campo name não pode ser vazio ou null.' })
  @IsString()
  @ApiProperty()
  name: string;
}
