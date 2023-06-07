import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePaperDTO {
  @IsNotEmpty({ message: 'O campo name não pode ser vazio ou null' })
  @IsString()
  @ApiProperty()
  name: string;

  @IsNotEmpty({ message: 'O campo description não pode ser vazio ou null' })
  @IsString()
  @ApiProperty()
  description: string;
}
