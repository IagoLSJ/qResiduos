import { AddressEntity } from '../address/address.entity';

export class DestinationEntity {
  id: string;
  name: string;
  Address: AddressEntity;
  createdAt: Date;
  updatedAt: Date;
}
