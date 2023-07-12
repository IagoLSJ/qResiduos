import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateEntryDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  observation: string;
}
