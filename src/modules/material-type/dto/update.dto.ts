import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateMaterialTypeDTO {
  @IsOptional()
  @IsNotEmpty({ message: 'O campo name não pode ser vazio ou null' })
  @IsString()
  @ApiProperty()
  name: string;

  @IsOptional()
  @IsNotEmpty({ message: 'O campo cateegoryId não pode ser vazi ou null' })
  @IsUUID()
  @ApiProperty()
  categoryId: string;
}
