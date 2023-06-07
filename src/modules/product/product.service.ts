import { Injectable } from '@nestjs/common';
import { CreateProductDTO } from './dto/create.dto';
import { UpdateProductDTO } from './dto/update.dto';
import { ProductRepository } from './product.repository';
import { ReturnProductDTO } from './dto/return.dto';
import AppError from 'src/shared/Error/AppError';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async findAll(): Promise<ReturnProductDTO[]> {
    const products = await this.productRepository.findAll();

    const productsWithDTO = products.map((product) => {
      return new ReturnProductDTO(
        product.id,
        product.name,
        product.createdAt,
        product.updatedAt,
      );
    });

    return productsWithDTO;
  }

  async findById(id: string): Promise<ReturnProductDTO> {
    const productById = await this.productRepository.findById(id);
    if (!productById) {
      throw new AppError('Id não encontrado', 400);
    }
    return new ReturnProductDTO(
      productById.id,
      productById.name,
      productById.createdAt,
      productById.updatedAt,
    );
  }

  async create(createProductDto: CreateProductDTO): Promise<ReturnProductDTO> {
    const productByName = await this.productRepository.findByName(
      createProductDto.name,
    );

    if (productByName) {
      throw new AppError('Name já cadastrado', 400);
    }

    const createdProduct = await this.productRepository.create(
      createProductDto,
    );

    return new ReturnProductDTO(
      createdProduct.id,
      createdProduct.name,
      createdProduct.createdAt,
      createdProduct.updatedAt,
    );
  }

  async update(
    id: string,
    updateProductDTO: UpdateProductDTO,
  ): Promise<ReturnProductDTO> {
    const productByName = await this.productRepository.findByName(
      updateProductDTO.name,
    );

    if (productByName && productByName.name != updateProductDTO.name) {
      throw new AppError('Name já cadastrado', 400);
    }

    const updatedProduct = await this.productRepository.update(
      id,
      updateProductDTO,
    );

    return new ReturnProductDTO(
      updatedProduct.id,
      updatedProduct.name,
      updatedProduct.createdAt,
      updatedProduct.updatedAt,
    );
  }

  async delete(id: string): Promise<void> {
    const productById = await this.findById(id);

    await this.productRepository.delete(productById.id);
  }
}
