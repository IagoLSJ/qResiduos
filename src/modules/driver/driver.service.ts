import { Injectable } from '@nestjs/common';
import { CreateDriverDTO } from './dto/create.dto';
import { UpdateDriverDTO } from './dto/update.dto';
import { DriverRepository } from './driver.repository';
import { RetunrDriverDTO } from './dto/return.dto';
import { DriverEntity } from './driver.entity';
import AppError from 'src/shared/Error/AppError';
import { VehicleService } from '../vehicle/vehicle.service';

@Injectable()
export class DriverService {
  constructor(
    private readonly driverRepository: DriverRepository,
    private readonly vehicleService: VehicleService,
  ) {}
  async findAll(): Promise<RetunrDriverDTO[]> {
    const drivers = await this.driverRepository.findAll();

    const driversWithReturnDTO = drivers.map((driver: DriverEntity) => {
      return new RetunrDriverDTO(
        driver.id,
        driver.name,
        driver.cnh,
        driver.vehicles,
        driver.createdAt,
        driver.updatedAt,
      );
    });

    return driversWithReturnDTO;
  }

  async findById(id: string): Promise<RetunrDriverDTO> {
    const driverById = await this.driverRepository.findById(id);

    if (!driverById) throw new AppError('Motorista não encontrada', 404);

    return new RetunrDriverDTO(
      driverById.id,
      driverById.name,
      driverById.cnh,
      driverById.vehicles,
      driverById.createdAt,
      driverById.updatedAt,
    );
  }

  async findByCNH(cnh: string): Promise<RetunrDriverDTO> {
    const driverById = await this.driverRepository.findByCNH(cnh);

    if (!driverById) throw new AppError('Motorista não encontrada', 404);

    return new RetunrDriverDTO(
      driverById.id,
      driverById.name,
      driverById.cnh,
      driverById.vehicles,
      driverById.createdAt,
      driverById.updatedAt,
    );
  }

  async create(createDriver: CreateDriverDTO): Promise<RetunrDriverDTO> {
    const vehicleById = await this.vehicleService.findById(
      createDriver.vehicleId,
    );

    const createdDriver = await this.driverRepository.create({
      name: createDriver.name,
      cnh: createDriver.cnh,
      vehicleId: vehicleById.id,
    });

    return new RetunrDriverDTO(
      createdDriver.id,
      createdDriver.name,
      createdDriver.cnh,
      createdDriver.vehicles,
      createdDriver.createdAt,
      createdDriver.updatedAt,
    );
  }

  async update(
    id: string,
    updateDriverDTO: UpdateDriverDTO,
  ): Promise<RetunrDriverDTO> {
   
   

    const updatedDriver = await this.driverRepository.update(
      id,
      updateDriverDTO,
    );

    return new RetunrDriverDTO(
      updatedDriver.id,
      updatedDriver.name,
      updatedDriver.cnh,
      updatedDriver.vehicles,
      updatedDriver.createdAt,
      updatedDriver.updatedAt,
    );
  }


  async delete(id: string): Promise<void> {
    const driverById = await this.findById(id);
    await this.driverRepository.delete(driverById.id);
  }
}
