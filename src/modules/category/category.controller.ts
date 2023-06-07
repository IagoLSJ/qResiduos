import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDTO } from './dto/create.dto';
import { UpdateCategoryDTO } from './dto/update.dto';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Category')
@ApiBearerAuth('JWT-auth')
@Controller('category')
export class CategoryController {
  constructor(private readonly CategoryService: CategoryService) {}
  @ApiResponse({
    status: 200,
    description: 'Listar todas as categorias criadas',
  })
  @Get()
  async findAll() {
    return await this.CategoryService.findAll();
  }
  @ApiResponse({
    status: 200,
    description: 'Categoria encontrada',
  })
  @ApiResponse({
    status: 401,
    description: 'Categoria não encontrada',
  })
  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.CategoryService.findById(id);
  }

  @ApiResponse({
    status: 200,
    description: 'Categoria criada com sucesso',
  })
  @ApiResponse({
    status: 406,
    description: 'Categoria já existe',
  })
  @Post()
  @ApiBody({
    type: CreateCategoryDTO,
  })
  async create(@Body() createExempleDto: CreateCategoryDTO) {
    return await this.CategoryService.create(createExempleDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Categoria atualizada com sucesso',
  })
  @ApiResponse({
    status: 406,
    description: 'Categoria já existe',
  })
  @Put(':id')
  @ApiBody({
    type: UpdateCategoryDTO,
  })
  async update(
    @Param('id') id: string,
    @Body() updateExempleDto: UpdateCategoryDTO,
  ) {
    return await this.CategoryService.update(id, updateExempleDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Categoria foi deletada com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Categoria não encontrada',
  })
  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.CategoryService.delete(id);
    return 'Categoria deletada com sucesso';
  }
}
