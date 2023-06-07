import { Injectable } from '@nestjs/common';
import { CreateCategoryDTO } from './dto/create.dto';
import { UpdateCategoryDTO } from './dto/update.dto';
import { ReturnCategoryDTO } from './dto/return.dto';
import { CategoryEntity } from './categroy.entity';
import AppError from 'src/shared/Error/AppError';
import { CategoryRepository } from './category.repository';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}
  
  async findAll(): Promise<ReturnCategoryDTO[]> {
    const categories = await this.categoryRepository.findAll();
    console.log(categories);
    const categoriesWithReturnDTO = categories.map(
      (category: CategoryEntity) => {
        return new ReturnCategoryDTO(
          category.id,
          category.name,
          category.MaterialType,
          category.createdAt,
          category.updatedAt,
        );
      },
    );

    return categoriesWithReturnDTO;
  }

  async findById(id: string): Promise<ReturnCategoryDTO> {
    const categoryById = await this.categoryRepository.findById(id);

    if (!categoryById) throw new AppError(' não encontrada', 404);

    return new ReturnCategoryDTO(
      categoryById.id,
      categoryById.name,
      categoryById.MaterialType,
      categoryById.createdAt,
      categoryById.updatedAt,
    );
  }

  async create(CreateCategroy: CreateCategoryDTO): Promise<ReturnCategoryDTO> {
    const categoryByName = await this.categoryRepository.findByName(
      CreateCategroy.name,
    );

    if (categoryByName) throw new AppError(' já existe', 406);

    const createdCategory = await this.categoryRepository.create(
      CreateCategroy,
    );

    return new ReturnCategoryDTO(
      createdCategory.id,
      createdCategory.name,
      createdCategory.MaterialType,
      createdCategory.createdAt,
      createdCategory.updatedAt,
    );
  }

  async update(
    id: string,
    updateCategory: UpdateCategoryDTO,
  ): Promise<ReturnCategoryDTO> {
    const categoryByName = await this.categoryRepository.findByName(
      updateCategory.name,
    );

    if (categoryByName) throw new AppError(' já existe', 406);

    const updatedCategory = await this.categoryRepository.update(
      id,
      updateCategory,
    );

    return new ReturnCategoryDTO(
      updatedCategory.id,
      updatedCategory.name,
      updatedCategory.MaterialType,
      updatedCategory.createdAt,
      updatedCategory.updatedAt,
    );
  }

  async delete(id: string): Promise<void> {
    await this.categoryRepository.delete(id);
  }
}
