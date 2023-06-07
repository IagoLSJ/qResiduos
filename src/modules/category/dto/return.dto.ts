import { ReturnMaterialTypeDTO } from 'src/modules/material-type/dto/return.dto';
import { MaterialTypeEntity } from 'src/modules/material-type/material-type.entity';

export class ReturnCategoryDTO {
  id: string;
  name: string;
  materialTypes: MaterialTypeEntity[];
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: string,
    name: string,
    materialTypes: MaterialTypeEntity[],
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.name = name;
    this.materialTypes =
      materialTypes &&
      materialTypes.map((materialType) => {
        return new ReturnMaterialTypeDTO(
          materialType.id,
          materialType.name,
          materialType.Category,
          materialType.createdAt,
          materialType.updatedAt,
        );
      });

    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
