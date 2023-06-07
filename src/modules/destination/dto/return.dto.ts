import { ReturnAddressDTO } from 'src/modules/address/dto/return.dto';

export class ReturnDestinationDTO {
  id: string;
  name: string;
  address: ReturnAddressDTO;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: string,
    name: string,
    address: ReturnAddressDTO,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.name = name;
    this.address =
      address &&
      new ReturnAddressDTO(
        address.id,
        address.street,
        address.neighborhood,
        address.number,
        address.city,
        address.state,
        address.cep,
        address.createdAt,
        address.updatedAt,
      );
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
