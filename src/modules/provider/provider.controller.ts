import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ProviderService } from './provider.service';
import { CreateProviderDTO } from './dto/create.dto';
import { UpdateProviderDTO } from './dto/update.dto';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Provider')
@ApiBearerAuth('JWT-auth')
@Controller('provider')
export class ProviderController {
  constructor(private readonly providerService: ProviderService) {}
  @ApiResponse({
    status: 200,
    description: 'Listar todos os fornecedores criadas',
  })
  @Get()
  async findAll() {
    return await this.providerService.findAll();
  }
  @ApiResponse({
    status: 200,
    description: 'Fornecedor encontrado',
  })
  @ApiResponse({
    status: 401,
    description: 'Fornecedor não encontrado',
  })
  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.providerService.findById(id);
  }

  @ApiResponse({
    status: 200,
    description: 'Fornecedor criado com sucesso',
  })
  @ApiResponse({
    status: 406,
    description: 'Fornecedor já existe',
  })
  @Post()
  @ApiBody({
    type: CreateProviderDTO,
  })
  async create(@Body() createProviderDto: CreateProviderDTO) {
    return await this.providerService.create(createProviderDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Fornecedor atualizado com sucesso',
  })
  @ApiResponse({
    status: 406,
    description: 'Fornecedor já existe',
  })
  @Put(':id')
  @ApiBody({
    type: UpdateProviderDTO,
  })
  async update(
    @Param('id') id: string,
    @Body() updateProviderDto: UpdateProviderDTO,
  ) {
    return await this.providerService.update(id, updateProviderDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Fornecedor foi deletado com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Fornecedor não encontrado',
  })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.providerService.delete(id);
    return 'Provedor deletado com sucesso';
  }
}
