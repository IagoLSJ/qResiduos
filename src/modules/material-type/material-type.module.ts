import { Module } from '@nestjs/common';
import { MaterialTypeService } from './material-type.service';
import { MaterialTypeController } from './material-type.controller';
import { MaterialTypeRepository } from './material-type.repository';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { CategoryModule } from '../category/category.module';

@Module({
  imports: [PrismaModule, CategoryModule],
  controllers: [MaterialTypeController],
  providers: [MaterialTypeService, MaterialTypeRepository],
  exports: [MaterialTypeService],
})
export class MaterialTypeModule {}
