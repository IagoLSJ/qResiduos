import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateExitDTO {
  @IsOptional()
  @IsString()
  observation: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  productQuantity: number;
}
