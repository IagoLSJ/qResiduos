import { Injectable } from '@nestjs/common';
import AppError from 'src/shared/Error/AppError';
import { CategoryService } from '../category/category.service';
import { CreateMaterialTypeDTO } from './dto/create.dto';
import { ReturnMaterialTypeDTO } from './dto/return.dto';
import { UpdateMaterialTypeDTO } from './dto/update.dto';
import { MaterialTypeRepository } from './material-type.repository';

@Injectable()
export class MaterialTypeService {
  constructor(
    private readonly materialTypeRepository: MaterialTypeRepository,
    private readonly categoryService: CategoryService,
  ) {}
  async findAll(): Promise<ReturnMaterialTypeDTO[]> {
    const materialTypes = await this.materialTypeRepository.findAll();
    const materialTypesWithReturnDTO = materialTypes.map((materialType) => {
      return new ReturnMaterialTypeDTO(
        materialType.id,
        materialType.name,
        materialType.Category,
        materialType.createdAt,
        materialType.updatedAt,
      );
    });

    return materialTypesWithReturnDTO;
  }

  async findById(id: string): Promise<ReturnMaterialTypeDTO> {
    const materialTypeById = await this.materialTypeRepository.findById(id);

    if (!materialTypeById) throw new AppError('Destino não encontrada', 404);

    return new ReturnMaterialTypeDTO(
      materialTypeById.id,
      materialTypeById.name,
      materialTypeById.category,
      materialTypeById.createdAt,
      materialTypeById.updatedAt,
    );
  }

  async create(
    createMaterial: CreateMaterialTypeDTO,
  ): Promise<ReturnMaterialTypeDTO> {
    const { name, categoryId } = createMaterial;

    const materialTypeByName = await this.materialTypeRepository.findByName(
      name,
    );

    const categoryById = await this.categoryService.findById(categoryId);

    if (materialTypeByName) throw new AppError('Destino já existe');

    const createdMaterialType = await this.materialTypeRepository.create({
      name,
      categoryId: categoryById.id,
    });

    return new ReturnMaterialTypeDTO(
      createdMaterialType.id,
      createdMaterialType.name,
      createdMaterialType.category,
      createdMaterialType.createdAt,
      createdMaterialType.updatedAt,
    );
  }

  async update(
    id: string,
    updateDestination: UpdateMaterialTypeDTO,
  ): Promise<ReturnMaterialTypeDTO> {
    const { name } = updateDestination;
    const materialTypeById = await this.findById(id);

    if (materialTypeById.name == name)
      throw new AppError(`O nome do mateerial já e ${name}`);

    const updatedMaterialType = await this.materialTypeRepository.update(id, {
      name,
      categoryId: materialTypeById.Category.id,
    });

    return new ReturnMaterialTypeDTO(
      updatedMaterialType.id,
      updatedMaterialType.name,
      updatedMaterialType.category,
      updatedMaterialType.createdAt,
      updatedMaterialType.updatedAt,
    );
  }

  async delete(id: string): Promise<void> {
    const destinationById = await this.findById(id);

    await this.materialTypeRepository.delete(destinationById.id);
  }
}
