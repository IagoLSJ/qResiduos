import { Injectable } from '@nestjs/common';
import { CreateVehicleDTO } from './dto/create.dto';
import { UpdateVehicleDTO } from './dto/update.dto';
import AppError from 'src/shared/Error/AppError';
import { VehicleRepository } from './vehicle.repository';
import { ReturnVehicleDTO } from './dto/return.dto';

@Injectable()
export class VehicleService {
  constructor(private readonly vehicleRepository: VehicleRepository) {}
  async findAll(): Promise<ReturnVehicleDTO[]> {
    const vehicles = await this.vehicleRepository.findAll();

    const vehiclesWithDTO = vehicles.map((vehicle) => {
      return new ReturnVehicleDTO(
        vehicle.id,
        vehicle.name,
        vehicle.placa,
        vehicle.createdAt,
        vehicle.updatedAt,
      );
    });

    return vehiclesWithDTO;
  }

  async findById(id: string): Promise<ReturnVehicleDTO> {
    const vehicleById = await this.vehicleRepository.findById(id);
    if (!vehicleById) {
      throw new AppError('Id não encontrado', 400);
    }
    return new ReturnVehicleDTO(
      vehicleById.id,
      vehicleById.name,
      vehicleById.placa,
      vehicleById.createdAt,
      vehicleById.updatedAt,
    );
  }

  async findByPlaca(placa: string): Promise<ReturnVehicleDTO> {
    const providerByPlaca = await this.vehicleRepository.findByPlaca(placa);

    if (providerByPlaca) {
      throw new AppError('Placa não encontrado', 400);
    }

    return new ReturnVehicleDTO(
      providerByPlaca.id,
      providerByPlaca.name,
      providerByPlaca.placa,
      providerByPlaca.createdAt,
      providerByPlaca.updatedAt,
    );
  }

  async create(createVehicle: CreateVehicleDTO): Promise<ReturnVehicleDTO> {
    const vehicleByPlaca = await this.vehicleRepository.findByPlaca(
      createVehicle.placa,
    );

    if (!vehicleByPlaca) {
      throw new AppError('Placa já cadastrada', 400);
    }

    const vehicleCreated = await this.vehicleRepository.create(createVehicle);

    return new ReturnVehicleDTO(
      vehicleCreated.id,
      vehicleCreated.name,
      vehicleCreated.placa,
      vehicleCreated.createdAt,
      vehicleCreated.updatedAt,
    );
  }

  async update(
    id: string,
    updateVehicleDto: UpdateVehicleDTO,
  ): Promise<ReturnVehicleDTO> {
    const vehicleById = await this.vehicleRepository.findById(id);
    const vehicleByPlaca = await this.vehicleRepository.findByPlaca(updateVehicleDto.placa);
    if (!vehicleById) {
      throw new AppError('Id não encontrado', 400);
    }
    if (!vehicleByPlaca && vehicleById.name != vehicleByPlaca.name) throw new AppError('Placa já cadastrado', 400);

    const providerUpdated = await this.vehicleRepository.update(
      id,
      updateVehicleDto,
    );

    return new ReturnVehicleDTO(
      providerUpdated.id,
      providerUpdated.name,
      providerUpdated.placa,
      providerUpdated.createdAt,
      providerUpdated.updatedAt,
    );
  }

  async delete(id: string): Promise<void> {
    const vehicleById = await this.findById(id);
    await this.vehicleRepository.delete(vehicleById.id);
  }
}
