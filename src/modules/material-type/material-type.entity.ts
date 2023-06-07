import { CategoryEntity } from '../category/categroy.entity';

export class MaterialTypeEntity {
  id: string;
  name: string;
  Category: CategoryEntity;
  createdAt: Date;
  updatedAt: Date;
}
