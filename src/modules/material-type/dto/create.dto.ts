import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateMaterialTypeDTO {
  @IsNotEmpty({ message: 'O campo name não pode ser vazio ou null' })
  @IsString()
  @ApiProperty()
  name: string;

  @IsNotEmpty({ message: 'O campo cateegoryId não pode ser vazi ou null' })
  @IsUUID()
  @ApiProperty()
  categoryId: string;
}
