import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { CreateVehicleDTO } from './dto/create.dto';
import { UpdateVehicleDTO } from './dto/update.dto';

@Controller('vehicle')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Post()
  create(@Body() CreateVehicleDTO: CreateVehicleDTO) {
    return this.vehicleService.create(CreateVehicleDTO);
  }

  @Get()
  async findAll() {
    return await this.vehicleService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.vehicleService.findById(id);
  }


  @Patch(':id')
 async  update(@Param('id') id: string, @Body() UpdateVehicleDTO: UpdateVehicleDTO) {
    return await this.vehicleService.update(id, UpdateVehicleDTO);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.vehicleService.delete(id);
  }
}
