import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateVehicleDTO {
  @IsOptional()
  @IsNotEmpty({ message: 'O campo nome não pode ser vazio ou null.' })
  @IsString()
  @ApiProperty()
  name: string;
  
  @IsOptional()
  @IsNotEmpty({ message: 'O campo placa não pode ser vazio ou null.' })
  @IsString()
  @ApiProperty()
  placa: string;
}
