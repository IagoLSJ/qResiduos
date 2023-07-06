import { Test, TestingModule } from '@nestjs/testing';
import { PaperService } from '../paper.service';
import { PaperRepository } from '../paper.repository';
import { ReturnPaperDTO } from '../dto/return.dto';
import { CreatePaperDTO } from '../dto/create.dto';
import { UpdatePaperDTO } from '../dto/update.dto';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import AppError from 'src/shared/Error/AppError';

describe('PaperService', () => {
  let paperService: PaperService;
  let paperRepository: PaperRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [PaperService, PaperRepository],
    }).compile();

    paperService = module.get<PaperService>(PaperService);
    paperRepository = module.get<PaperRepository>(PaperRepository);
  });

  describe('findAll', () => {
    it('should return an array of papers', async () => {
      const mockPapers = [
        {
          id: '1',
          name: 'Paper 1',
          description: 'Description 1',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          name: 'Paper 2',
          description: 'Description 2',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      jest.spyOn(paperRepository, 'findAll').mockResolvedValue(mockPapers);

      const result = await paperService.findAll();

      expect(result).toEqual(
        mockPapers.map(
          (paper) =>
            new ReturnPaperDTO(
              paper.id,
              paper.name,
              paper.description,
              paper.createdAt,
              paper.updatedAt,
            ),
        ),
      );
    });
  });

  describe('findById', () => {
    it('should return a paper by id', async () => {
      const mockPaper = {
        id: '1',
        name: 'Paper 1',
        description: 'Description 1',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(paperRepository, 'findById').mockResolvedValue(mockPaper);

      const result = await paperService.findById('1');

      expect(result).toEqual(
        new ReturnPaperDTO(
          mockPaper.id,
          mockPaper.name,
          mockPaper.description,
          mockPaper.createdAt,
          mockPaper.updatedAt,
        ),
      );
    });

    it('should throw an error if paper is not found', async () => {
      jest.spyOn(paperRepository, 'findById').mockResolvedValue(undefined);
      await expect(paperService.findById('1')).rejects.toEqual({
        message: 'Id não encontrado',
        statusCode: 400,
      });
    });
  });

  describe('create', () => {
    it('should create and return a new paper', async () => {
      const createPaperDto: CreatePaperDTO = {
        name: 'New Paper',
        description: 'New Description',
      };
      const mockCreatedPaper = {
        id: '1',
        name: 'New Paper',
        description: 'New Description',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(paperRepository, 'findByName').mockResolvedValue(null);
      jest.spyOn(paperRepository, 'create').mockResolvedValue(mockCreatedPaper);

      const result = await paperService.create(createPaperDto);

      expect(result).toEqual(
        new ReturnPaperDTO(
          mockCreatedPaper.id,
          mockCreatedPaper.name,
          mockCreatedPaper.description,
          mockCreatedPaper.createdAt,
          mockCreatedPaper.updatedAt,
        ),
      );
    });

    it('should throw an error if paper name already exists', async () => {
      const createPaperDto: CreatePaperDTO = {
        name: 'Existing Paper',
        description: 'New Description',
      };
      const mockExistingPaper = {
        id: '1',
        name: 'Existing Paper',
        description: 'Existing Description',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest
        .spyOn(paperRepository, 'findByName')
        .mockResolvedValue(mockExistingPaper);

      await expect(paperService.create(createPaperDto)).rejects.toEqual({
        message: 'Name já cadastrado',
        statusCode: 400,
      });
    });
  });

  describe('update', () => {
    it('should update and return an existing paper', async () => {
      const updatePaperDto: UpdatePaperDTO = {
        name: 'Updated Paper',
        description: 'Updated Description',
      };
      const mockExistingPaper = {
        id: '1',
        name: 'Existing Paper',
        description: 'Existing Description',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const mockUpdatedPaper = {
        id: '1',
        name: 'Updated Paper',
        description: 'Updated Description',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest
        .spyOn(paperRepository, 'findByName')
        .mockResolvedValue(mockExistingPaper);
      jest.spyOn(paperRepository, 'update').mockResolvedValue(mockUpdatedPaper);

      const result = await paperService.update('1', updatePaperDto);

      expect(result).toEqual(
        new ReturnPaperDTO(
          mockUpdatedPaper.id,
          mockUpdatedPaper.name,
          mockUpdatedPaper.description,
          mockUpdatedPaper.createdAt,
          mockUpdatedPaper.updatedAt,
        ),
      );
    });

    it('should throw an error if paper name already exists (excluding itself)', async () => {
      const updatePaperDto: UpdatePaperDTO = {
        name: 'Existing Paper',
        description: 'Updated Description',
      };
      const mockExistingPaper = {
        id: '1',
        name: 'Existing Paper',
        description: 'Existing Description',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest
        .spyOn(paperRepository, 'findByName')
        .mockResolvedValue(mockExistingPaper);

      await expect(
        paperService.update('1', updatePaperDto),
      ).rejects.toEqual({
        message: 'Name já cadastrado',
        statusCode: 400,
      });
    });
  });

  describe('delete', () => {
    it('should delete a paper by id', async () => {
      const mockPaper = {
        id: '1',
        name: 'Paper 1',
        description: 'Description 1',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(paperService, 'findById').mockResolvedValue(mockPaper);
      jest.spyOn(paperRepository, 'delete').mockResolvedValue();

      await paperService.delete('1');

      expect(paperRepository.delete).toHaveBeenCalledWith(mockPaper.id);
    });
  });
});
