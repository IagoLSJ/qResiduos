export class ReturnVehicleDTO {
  id: string;
  name: string;
  placa: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: string,
    name: string,
    placa: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    {
      this.id = id;
      this.name = name;
      this.placa = placa;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
    }
  }
}
