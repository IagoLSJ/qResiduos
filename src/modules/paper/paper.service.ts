import { Injectable } from '@nestjs/common';
import { CreatePaperDTO } from './dto/create.dto';
import { UpdatePaperDTO } from './dto/update.dto';
import { PaperRepository } from './paper.repository';
import { ReturnPaperDTO } from './dto/return.dto';
import AppError from 'src/shared/Error/AppError';

@Injectable()
export class PaperService {
  constructor(private readonly paperRepository: PaperRepository) {}

  async findAll(): Promise<ReturnPaperDTO[]> {
    const papers = await this.paperRepository.findAll();

    const papersWithDTO = papers.map((papers) => {
      return new ReturnPaperDTO(
        papers.id,
        papers.name,
        papers.description,
        papers.createdAt,
        papers.updatedAt,
      );
    });

    return papersWithDTO;
  }

  async findById(id: string): Promise<ReturnPaperDTO> {
    const paperById = await this.paperRepository.findById(id);
    if (!paperById) {
      throw new AppError('Id não encontrado', 400);
    }
    return new ReturnPaperDTO(
      paperById.id,
      paperById.name,
      paperById.description,
      paperById.createdAt,
      paperById.updatedAt,
    );
  }

  async create(createPaperDto: CreatePaperDTO): Promise<ReturnPaperDTO> {
    const paperByName = await this.paperRepository.findByName(
      createPaperDto.name,
    );

    if (paperByName) {
      throw new AppError('Name já cadastrado', 400);
    }

    const createdPaper = await this.paperRepository.create(createPaperDto);

    return new ReturnPaperDTO(
      createdPaper.id,
      createdPaper.name,
      createdPaper.description,
      createdPaper.createdAt,
      createdPaper.updatedAt,
    );
  }

  async update(
    id: string,
    updatePaperDto: UpdatePaperDTO,
  ): Promise<ReturnPaperDTO> {
    const paperByName = await this.paperRepository.findByName(
      updatePaperDto.name,
    );

    if (paperByName && paperByName.name != updatePaperDto.name) {
      throw new AppError('Name já cadastrado', 400);
    }

    const updatedPaper = await this.paperRepository.update(id, updatePaperDto);

    return new ReturnPaperDTO(
      updatedPaper.id,
      updatedPaper.name,
      updatedPaper.description,
      updatedPaper.createdAt,
      updatedPaper.updatedAt,
    );
  }

  async delete(id: string): Promise<void> {
    const paperById = await this.findById(id);

    await this.paperRepository.delete(paperById.id);
  }
}
