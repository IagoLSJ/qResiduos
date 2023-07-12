import { ReturnVehicleDTO } from 'src/modules/vehicle/dto/return.dto';
import { VehicleEntity } from 'src/modules/vehicle/vehicle.entity';

export class RetunrDriverDTO {
  id: string;
  name: string;
  cnh: string;
  vehicles: VehicleEntity[];
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: string,
    name: string,
    cnh: string,
    vehicles: VehicleEntity[],
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.name = name;
   this.cnh = cnh;
    this.vehicles =
      vehicles &&
      vehicles.map((vehicle) => {
        return new ReturnVehicleDTO(
          vehicle.id,
          vehicle.name,
          vehicle.placa,
          vehicle.createdAt,
          vehicle.updatedAt,
        );
      });
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
