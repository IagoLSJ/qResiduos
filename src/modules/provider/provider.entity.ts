import { AddressEntity } from '../address/address.entity';
export class ProviderEntity {
  id: string;
  username: string;
  email: string;
  cpf: string;
  telephone: string;
  Address: AddressEntity;
  createdAt: Date;
  updatedAt: Date;
}
