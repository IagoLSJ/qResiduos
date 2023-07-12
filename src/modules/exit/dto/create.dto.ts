import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { ExitType } from '../enum/exitType';

export class CreateExitDTO {
  @IsNotEmpty()
  @IsUUID()
  providerId: string;

  @IsNotEmpty()
  @IsUUID()
  productId: string;

  @IsOptional()
  @IsUUID()
  destinationId: string;

  @IsOptional()
  @IsString()
  observation?: string;

  @IsNotEmpty()
  @IsEnum({ ExitType })
  exitType: ExitType;

  @IsNotEmpty()
  @IsString()
  productQuantity: number;
}
