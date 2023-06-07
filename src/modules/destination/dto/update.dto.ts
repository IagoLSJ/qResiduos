import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UpdateAddressDTO } from 'src/modules/address/dto/update.dto';

export class UpdateDestinationDTO {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsNotEmpty()
  @Type(() => UpdateAddressDTO)
  address: UpdateAddressDTO;
}
