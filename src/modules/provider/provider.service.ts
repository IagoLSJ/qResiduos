import { Injectable } from '@nestjs/common';
import { ProviderRepository } from './provider.repository';
import { CreateProviderDTO } from './dto/create.dto';
import { UpdateProviderDTO } from './dto/update.dto';
import AppError from 'src/shared/Error/AppError';
import { AddressService } from '../address/address.service';
import { ReturnProviderDTO } from './dto/return.dto';
@Injectable()
export class ProviderService {
  constructor(
    private readonly providerRepository: ProviderRepository,
    private readonly addressService: AddressService,
  ) {}
  async findAll(): Promise<ReturnProviderDTO[]> {
    const providers = await this.providerRepository.findAll();

    const providersWithDTO = providers.map((provider) => {
      return new ReturnProviderDTO(
        provider.id,
        provider.username,
        provider.email,
        provider.cpf,
        provider.telephone,
        provider.Address,
        provider.createdAt,
        provider.updatedAt,
      );
    });

    return providersWithDTO;
  }

  async findById(id: string): Promise<ReturnProviderDTO> {
    const providerById = await this.providerRepository.findById(id);
    if (!providerById) {
      throw new AppError('Id não encontrado', 400);
    }
    return new ReturnProviderDTO(
      providerById.id,
      providerById.username,
      providerById.email,
      providerById.cpf,
      providerById.telephone,
      providerById.Address,
      providerById.createdAt,
      providerById.updatedAt,
    );
  }

  async findByEmail(email: string): Promise<ReturnProviderDTO> {
    const providerByEmail = await this.providerRepository.findByEmail(email);

    if (providerByEmail) {
      throw new AppError('E-mail não encontrado', 400);
    }

    return new ReturnProviderDTO(
      providerByEmail.id,
      providerByEmail.username,
      providerByEmail.email,
      providerByEmail.cpf,
      providerByEmail.telephone,
      providerByEmail.Address,
      providerByEmail.createdAt,
      providerByEmail.updatedAt,
    );
  }
  async create(createProvider: CreateProviderDTO): Promise<ReturnProviderDTO> {
    const { email, address } = createProvider;
    const providerByEmail = await this.providerRepository.findByEmail(email);

    if (providerByEmail) {
      throw new AppError('E-mail já cadastrado');
    }

    const createdAddress = await this.addressService.create(address);

    const providerCreated = await this.providerRepository.create({
      username: createProvider.username,
      cpf: createProvider.cpf,
      email: createProvider.email,
      telephone: createProvider.telephone,
      addressId: createdAddress.id,
    });

    return new ReturnProviderDTO(
      providerCreated.id,
      providerCreated.username,
      providerCreated.email,
      providerCreated.cpf,
      providerCreated.telephone,
      providerCreated.Address,
      providerCreated.createdAt,
      providerCreated.updatedAt,
    );
  }

  async update(
    id: string,
    updateProviderDto: UpdateProviderDTO,
  ): Promise<ReturnProviderDTO> {
    const { email } = updateProviderDto;
    const providerById = await this.providerRepository.findById(id);
    const providerByEmail = await this.providerRepository.findByEmail(email);
    if (!providerById) {
      throw new AppError('Id não encontrado', 400);
    }
    if (providerByEmail) throw new AppError('E-mail já cadastrado', 400);

    const providerUpdated = await this.providerRepository.update(
      id,
      updateProviderDto,
    );

    return new ReturnProviderDTO(
      providerUpdated.id,
      providerUpdated.username,
      providerUpdated.email,
      providerUpdated.cpf,
      providerUpdated.telephone,
      providerUpdated.Address,
      providerUpdated.createdAt,
      providerUpdated.updatedAt,
    );
  }

  async delete(id: string): Promise<void> {
    const providerById = await this.providerRepository.findById(id);
    if (!providerById) {
      throw new AppError('Id não encontrado', 400);
    }
    await this.providerRepository.delete(id);
  }
}
