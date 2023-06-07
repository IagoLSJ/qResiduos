import { Injectable } from '@nestjs/common';
import { CreateDestinationDTO } from './dto/create.dto';
import { UpdateDestinationDTO } from './dto/update.dto';
import { ReturnDestinationDTO } from './dto/return.dto';
import AppError from 'src/shared/Error/AppError';
import { DestinationRepository } from './destination.repository';
import { AddressService } from '../address/address.service';

@Injectable()
export class DestinationService {
  constructor(
    private readonly destinatinoRepository: DestinationRepository,
    private readonly addressService: AddressService,
  ) {}

  async findAll(): Promise<ReturnDestinationDTO[]> {
    const destinations = await this.destinatinoRepository.findAll();

    const destinationsWithReturnDTO = destinations.map((destination) => {
      return new ReturnDestinationDTO(
        destination.id,
        destination.name,
        destination.Address,
        destination.createdAt,
        destination.updatedAt,
      );
    });

    return destinationsWithReturnDTO;
  }

  async findById(id: string): Promise<ReturnDestinationDTO> {
    const destinationById = await this.destinatinoRepository.findById(id);

    if (!destinationById) throw new AppError('Destino não encontrada', 404);

    return new ReturnDestinationDTO(
      destinationById.id,
      destinationById.name,
      destinationById.Address,
      destinationById.createdAt,
      destinationById.updatedAt,
    );
  }

  async create(
    CreateDestination: CreateDestinationDTO,
  ): Promise<ReturnDestinationDTO> {
    const { name, address } = CreateDestination;
    const destinationByName = await this.destinatinoRepository.findByName(name);

    if (destinationByName) throw new AppError('Destino já existe');

    const createAddress = await this.addressService.create(address);

    const createdDestination = await this.destinatinoRepository.create({
      addressId: createAddress.id,
      name,
    });

    return new ReturnDestinationDTO(
      createdDestination.id,
      createdDestination.name,
      createAddress,
      createdDestination.createdAt,
      createdDestination.updatedAt,
    );
  }

  async update(
    id: string,
    updateDestination: UpdateDestinationDTO,
  ): Promise<ReturnDestinationDTO> {
    const { name, address } = updateDestination;
    const destinationById = await this.findById(id);

    if (destinationById.name == name)
      throw new AppError(`O nome do destino já e ${name}`);

    if (address) {
      await this.addressService.update(destinationById.address.id, address);
    }
    const updatedDestination = await this.destinatinoRepository.update(id, {
      name,
      addressId: destinationById.address.id,
    });

    return new ReturnDestinationDTO(
      updatedDestination.id,
      updatedDestination.name,
      updatedDestination.Address,
      updatedDestination.createdAt,
      updatedDestination.updatedAt,
    );
  }

  async delete(id: string): Promise<void> {
    const destinationById = await this.findById(id);

    await this.destinatinoRepository.delete(destinationById.id);
    await this.addressService.delete(destinationById.address.id);
  }
}
