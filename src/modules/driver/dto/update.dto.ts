import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class UpdateDriverDTO {
  @IsOptional()
  @IsNotEmpty({ message: 'O campo nome não pode ser vazio ou null.' })
  @IsString()
  @ApiProperty()
  name: string;
  
  @IsOptional()
  @IsNotEmpty({ message: 'O campo placa não pode ser vazio ou null.' })
  @IsString()
  @ApiProperty()
  cnh: string;

  @IsOptional()
  @IsNotEmpty({ message: 'O campo placa não pode ser vazio ou null.' })
  @IsUUID()
  @ApiProperty()
  vehicleId:string
}
