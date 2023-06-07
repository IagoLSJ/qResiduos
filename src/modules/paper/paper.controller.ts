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
import { CreatePaperDTO } from './dto/create.dto';
import { ReturnPaperDTO } from './dto/return.dto';
import { UpdatePaperDTO } from './dto/update.dto';
import { PaperService } from './paper.service';
@ApiTags('Paper')
@ApiBearerAuth('JWT-auth')
@Controller('paper')
export class PaperController {
  constructor(private readonly paperService: PaperService) {}
  @ApiResponse({
    status: 200,
    description: 'Listar todos os papeis criadas',
  })
  @Get()
  async findAll(): Promise<ReturnPaperDTO[]> {
    return await this.paperService.findAll();
  }
  @ApiResponse({
    status: 200,
    description: 'Papel encontrado',
  })
  @ApiResponse({
    status: 401,
    description: 'Papel não encontrado',
  })
  @Get(':id')
  async findById(@Param('id') id: string): Promise<ReturnPaperDTO> {
    return await this.paperService.findById(id);
  }

  @ApiResponse({
    status: 200,
    description: 'Papel criada com sucesso',
  })
  @ApiResponse({
    status: 406,
    description: 'Papel já existe',
  })
  @Post()
  @ApiBody({
    type: CreatePaperDTO,
  })
  async create(
    @Body() createPaperDto: CreatePaperDTO,
  ): Promise<ReturnPaperDTO> {
    return await this.paperService.create(createPaperDto);
  }
  @ApiResponse({
    status: 200,
    description: 'Papel atualizado com sucesso',
  })
  @ApiResponse({
    status: 406,
    description: 'Papel já existe',
  })
  @Put(':id')
  @ApiBody({
    type: UpdatePaperDTO,
  })
  async update(
    @Param('id') id: string,
    @Body() updatePaperDto: UpdatePaperDTO,
  ): Promise<ReturnPaperDTO> {
    return await this.paperService.update(id, updatePaperDto);
  }
  @ApiResponse({
    status: 200,
    description: 'Papel foi deletado com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Papel não encontrado',
  })
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<string> {
    await this.paperService.delete(id);
    return 'Paper deletado com sucesso';
  }
}
