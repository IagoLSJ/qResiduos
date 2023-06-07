import { CategoryEntity } from 'src/modules/category/categroy.entity';
import { ReturnCategoryDTO } from 'src/modules/category/dto/return.dto';

export class ReturnMaterialTypeDTO {
  id: string;
  name: string;
  Category: ReturnCategoryDTO;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: string,
    name: string,
    Category: CategoryEntity,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.name = name;
    this.Category =
      Category &&
      new ReturnCategoryDTO(
        Category.id,
        Category.name,
        null,
        Category.createdAt,
        Category.updatedAt,
      );
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
