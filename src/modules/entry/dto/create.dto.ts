import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateEntryDTO {
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty()
  provider: string;

  @IsNotEmpty()
  @IsUUID()
  @ApiProperty()
  destination: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  observation: string;
}
