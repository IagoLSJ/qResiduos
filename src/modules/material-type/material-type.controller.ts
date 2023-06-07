import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CreateMaterialTypeDTO } from './dto/create.dto';
import { UpdateMaterialTypeDTO } from './dto/update.dto';
import { MaterialTypeService } from './material-type.service';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Material-type')
@ApiBearerAuth('JWT-auth')
@Controller('material-type')
export class MaterialTypeController {
  constructor(private readonly materialTypeService: MaterialTypeService) {}

  @ApiResponse({
    status: 200,
    description: 'Listar todas os tipos de materiais cadastrados',
  })
  @Get()
  async findAll() {
    return this.materialTypeService.findAll();
  }

  @ApiResponse({
    status: 200,
    description: 'Tipo de material encontrada',
  })
  @ApiResponse({
    status: 401,
    description: 'Tipo de material não encontrada',
  })
  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.materialTypeService.findById(id);
  }

  @ApiResponse({
    status: 200,
    description: 'Tipo de material criado com sucesso',
  })
  @ApiResponse({
    status: 406,
    description: 'Tipo de material já existe',
  })
  @Post()
  @ApiBody({
    type: CreateMaterialTypeDTO,
  })
  async create(@Body() createExempleDto: CreateMaterialTypeDTO) {
    return this.materialTypeService.create(createExempleDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Tipo de material atualizado com sucesso',
  })
  @ApiResponse({
    status: 406,
    description: 'Tipo de material já existe',
  })
  @Put(':id')
  @ApiBody({
    type: UpdateMaterialTypeDTO,
  })
  async update(
    @Param('id') id: string,
    @Body() updateExempleDto: UpdateMaterialTypeDTO,
  ) {
    return this.materialTypeService.update(id, updateExempleDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Tipo de material foi deletado com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Tipo de material não encontrado',
  })
  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.materialTypeService.delete(id);
    return 'Material type deletado com sucesso';
  }
}
