export class ReturnAddressDTO {
  id: string;
  street: string;
  neighborhood: string;
  number: number;
  city: string;
  state: string;
  cep: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: string,
    street: string,
    neighborhood: string,
    number: number,
    city: string,
    state: string,
    cep: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.street = street;
    this.neighborhood = neighborhood;
    this.number = number;
    this.city = city;
    this.state = state;
    this.cep = cep;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
