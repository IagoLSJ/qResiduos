import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateExitDTO } from './dto/create.dto';
import { UpdateExitDTO } from './dto/update.dto';
import { ExitService } from './exit.service';
@ApiTags('Exit')
@ApiBearerAuth('defaultBearerAuth')
@Controller('exit')
export class ExitController {
  constructor(private readonly exitService: ExitService) {}
  @ApiResponse({
    status: 200,
    description: 'Listar todas as saidas criadas',
  })
  @Get()
  async findAll() {
    return await this.exitService.findAll();
  }

  @ApiResponse({
    status: 200,
    description: 'Saida encontrada',
  })
  @ApiResponse({
    status: 401,
    description: 'Saida não encontrada',
  })
  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.exitService.findById(id);
  }

  @ApiResponse({
    status: 200,
    description: 'Saida criada com sucesso',
  })
  @ApiResponse({
    status: 406,
    description: 'Saida já existe',
  })
  @Post()
  @ApiBody({
    type: CreateExitDTO,
  })
  async create(@Body() createExitDto: CreateExitDTO) {
    return await this.exitService.create(createExitDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Saida atualizada com sucessa',
  })
  @ApiResponse({
    status: 406,
    description: 'Saida já existe',
  })
  @Put(':id')
  @ApiBody({
    type: UpdateExitDTO,
  })
  async update(@Param('id') id: string, @Body() updateExitDto: UpdateExitDTO) {
    return await this.exitService.update(id, updateExitDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Saida foi deletada com sucessa',
  })
  @ApiResponse({
    status: 404,
    description: 'Saida não encontrada',
  })
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.exitService.delete(id);
  }
}
