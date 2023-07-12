import { Injectable } from '@nestjs/common';
import AppError from 'src/shared/Error/AppError';
import { DestinationService } from '../destination/destination.service';
import { ProductService } from '../product/product.service';
import { ProviderService } from '../provider/provider.service';
import { CreateExitDTO } from './dto/create.dto';
import { UpdateExitDTO } from './dto/update.dto';
import { ExitRepository } from './exit.repository';

@Injectable()
export class ExitService {
  constructor(
    private readonly exitRepository: ExitRepository,
    private readonly providerService: ProviderService,
    private readonly destinationService: DestinationService,
    private readonly productService: ProductService,
  ) {}
  async findAll() {
    return await this.exitRepository.findAll();
  }

  async findById(id: string) {
    const exitById = await this.exitRepository.findById(id);

    if (!exitById) throw new AppError('Saida não encontrada');

    return exitById;
  }
  async create(createExitDto: CreateExitDTO) {
    const { providerId, destinationId, productId, exitType } = createExitDto;
    const providerById = await this.providerService.findById(providerId);
    const productById = await this.productService.findById(productId);
    let createdExit;
    if (exitType == 'Donation') {
      const destinationById = await this.destinationService.findById(
        destinationId,
      );
      createdExit = await this.exitRepository.create({
        productId: productById.id,
        destinationId: destinationById.id,
        exitType: exitType,
        observation: createExitDto.observation,
        productQuantity: createExitDto.productQuantity,
        providerId: providerById.id,
      });
    }
    createdExit = await this.exitRepository.create({
      productId: productById.id,
      exitType: exitType,
      observation: createExitDto.observation,
      productQuantity: createExitDto.productQuantity,
      providerId: providerById.id,
    });

    return createdExit;
  }
  async update(id: string, updateExitDto: UpdateExitDTO) {
    const exitById = await this.findById(id);

    const updatedExit = await this.exitRepository.update(
      exitById.id,
      updateExitDto,
    );

    return updatedExit;
  }

  async delete(id: string) {
    const exitById = await this.findById(id);

    await this.exitRepository.delete(exitById.id);
  }
}
