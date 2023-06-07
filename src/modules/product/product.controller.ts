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
import { CreateProductDTO } from './dto/create.dto';
import { ReturnProductDTO } from './dto/return.dto';
import { UpdateProductDTO } from './dto/update.dto';
import { ProductService } from './product.service';
@ApiTags('Product')
@ApiBearerAuth('JWT-auth')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @ApiResponse({
    status: 200,
    description: 'Listar todos os produtos criadas',
  })
  @Get()
  async findAll(): Promise<ReturnProductDTO[]> {
    return await this.productService.findAll();
  }
  @ApiResponse({
    status: 200,
    description: 'Produto encontrado',
  })
  @ApiResponse({
    status: 401,
    description: 'Produto não encontrado',
  })
  @Get(':id')
  async findById(@Param('id') id: string): Promise<ReturnProductDTO> {
    return await this.productService.findById(id);
  }

  @ApiResponse({
    status: 200,
    description: 'Produto criada com sucesso',
  })
  @ApiResponse({
    status: 406,
    description: 'Produto já existe',
  })
  @Post()
  @ApiBody({
    type: CreateProductDTO,
  })
  async create(
    @Body() createPaperDto: CreateProductDTO,
  ): Promise<ReturnProductDTO> {
    return await this.productService.create(createPaperDto);
  }
  @ApiResponse({
    status: 200,
    description: 'Produto atualizado com sucesso',
  })
  @ApiResponse({
    status: 406,
    description: 'Produto já existe',
  })
  @Put(':id')
  @ApiBody({
    type: UpdateProductDTO,
  })
  async update(
    @Param('id') id: string,
    @Body() updatePaperDto: UpdateProductDTO,
  ): Promise<ReturnProductDTO> {
    return await this.productService.update(id, updatePaperDto);
  }
  @ApiResponse({
    status: 200,
    description: 'Produto foi deletado com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Produto não encontrado',
  })
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<string> {
    await this.productService.delete(id);
    return 'Produto deletado com sucesso';
  }
}
