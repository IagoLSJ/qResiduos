import { VehicleEntity } from '../vehicle/vehicle.entity';

export class DriverEntity {
  id: string;
  name: string;
  cnh: string;
  vehicles?: VehicleEntity[];
  createdAt: Date;
  updatedAt: Date;
}
