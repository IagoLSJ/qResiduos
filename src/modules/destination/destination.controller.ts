import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { DestinationService } from './destination.service';
import { CreateDestinationDTO } from './dto/create.dto';
import { UpdateDestinationDTO } from './dto/update.dto';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Destination')
@ApiBearerAuth('JWT-auth')
@Controller('destination')
export class DestinationController {
  constructor(private readonly destinationService: DestinationService) {}

  @ApiResponse({
    status: 200,
    description: 'Listar todas os destinos cadastrados',
  })
  @Get()
  async findAll() {
    return this.destinationService.findAll();
  }

  @ApiResponse({
    status: 200,
    description: 'Destino encontrada',
  })
  @ApiResponse({
    status: 401,
    description: 'Destino não encontrada',
  })
  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.destinationService.findById(id);
  }

  @ApiResponse({
    status: 200,
    description: 'Destino criada com sucesso',
  })
  @ApiResponse({
    status: 406,
    description: 'Destino já existe',
  })
  @Post()
  @ApiBody({
    type: CreateDestinationDTO,
  })
  async create(@Body() createExempleDto: CreateDestinationDTO) {
    return this.destinationService.create(createExempleDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Destino atualizada com sucesso',
  })
  @ApiResponse({
    status: 406,
    description: 'Destino já existe',
  })
  @Put(':id')
  @ApiBody({
    type: UpdateDestinationDTO,
  })
  async update(
    @Param('id') id: string,
    @Body() updateExempleDto: UpdateDestinationDTO,
  ) {
    return this.destinationService.update(id, updateExempleDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Destino foi deletada com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Destino não encontrada',
  })
  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.destinationService.delete(id);

    return 'Destino deletado com sucesso';
  }
}
