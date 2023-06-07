import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdatePaperDTO {
  @IsOptional()
  @IsNotEmpty({ message: 'O campo name não pode ser vazio ou null' })
  @IsString()
  @ApiProperty()
  name: string;
  @IsOptional()
  @IsNotEmpty({ message: 'O campo description não pode ser vazio ou null' })
  @IsString()
  @ApiProperty()
  description: string;
}
