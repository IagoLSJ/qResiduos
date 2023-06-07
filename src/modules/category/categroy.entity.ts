import { MaterialTypeEntity } from '../material-type/material-type.entity';

export class CategoryEntity {
  id: string;
  name: string;
  MaterialType?: MaterialTypeEntity[];
  createdAt: Date;
  updatedAt: Date;
}
