import { Injectable } from '@nestjs/common';
import { DestinationService } from '../destination/destination.service';
import { ProviderService } from '../provider/provider.service';
import { CreateEntryDTO } from './dto/create.dto';
import { UpdateEntryDTO } from './dto/update.dto';
import { EntryRepository } from './entry.repository';
import { FileService } from './file/file.service';

@Injectable()
export class EntryService {
  constructor(
    private readonly entryRepository: EntryRepository,
    private readonly providerService: ProviderService,
    private readonly destinationService: DestinationService,
    private readonly fileService: FileService,
  ) {}

  async findAll(): Promise<any[]> {
    const appetizer = await this.entryRepository.findAll();

    return appetizer;
  }

  async findById(id: string): Promise<any> {
    const entryById = await this.entryRepository.findById(id);

    return entryById;
  }

  async create(
    createEntryDto: CreateEntryDTO,
    file: Express.Multer.File,
  ): Promise<any> {
    const fileUpdated = await this.fileService.upload(file);
    const providerById = await this.providerService.findById(
      createEntryDto.provider,
    );
    const destinationById = await this.destinationService.findById(
      createEntryDto.destination,
    );

    const createdEntry = await this.entryRepository.create({
      providerId: providerById.id,
      destinationId: destinationById.id,
      observation: createEntryDto.observation,
      fileUrl: fileUpdated.downloadURL,
    });

    return createdEntry;
  }

  async update(id: string, updateEntryDto: UpdateEntryDTO): Promise<any> {
    const entryById = await this.findById(id);

    const updatedEntry = await this.entryRepository.update(
      entryById.id,
      updateEntryDto,
    );

    return updatedEntry;
  }

  async delete(id: string): Promise<void> {
    const entryById = await this.findById(id);
    await this.entryRepository.delete(entryById.id);
  }
}
