import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateVehicleDTO {
  @IsNotEmpty({ message: 'O campo nome não pode ser vazio ou null.' })
  @IsString()
  @ApiProperty()
  name: string;

  @IsNotEmpty({ message: 'O campo placa não pode ser vazio ou null.' })
  @IsString()
  @ApiProperty()
  placa: string;

}
