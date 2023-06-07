import { ReturnAddressDTO } from '../../address/dto/return.dto';
export class ReturnProviderDTO {
  id: string;
  username: string;
  email: string;
  cpf: string;
  telephone: string;
  address: ReturnAddressDTO;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: string,
    username: string,
    email: string,
    cpf: string,
    telephone: string,
    address: ReturnAddressDTO,
    createdAt: Date,
    updatedAt: Date,
  ) {
    {
      this.id = id;
      this.username = username;
      this.email = email;
      this.cpf = cpf;
      this.telephone = telephone;
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
}
