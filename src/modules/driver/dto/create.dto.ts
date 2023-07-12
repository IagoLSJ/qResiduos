import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateDriverDTO {

  @IsNotEmpty({ message: 'O campo nome não pode ser vazio ou null.' })
  @IsString()
  @ApiProperty()
  name: string;

  @IsNotEmpty({ message: 'O campo placa não pode ser vazio ou null.' })
  @IsString()
  @ApiProperty()
  cnh: string;

  @IsNotEmpty({ message: 'O campo placa não pode ser vazio ou null.' })
  @IsUUID()
  @ApiProperty()
  vehicleId:string
}
