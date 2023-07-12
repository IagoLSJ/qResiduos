import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DriverService } from './driver.service';
import { CreateDriverDTO } from './dto/create.dto';
import { UpdateDriverDTO } from './dto/update.dto';

@Controller('driver')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @Get()
 async findAll() {
    return await this.driverService.findAll();
  }

  @Get(':id')
  async finById(@Param('id') id: string) {
    return await this.driverService.findById(id);
  }

  @Post()
  async create(@Body() createDriverDto: CreateDriverDTO) {
    return await this.driverService.create(createDriverDto);
  }

  

  @Patch(':id')
 async  update(@Param('id') id: string, @Body() updateDriverDto: UpdateDriverDTO) {
    return await this.driverService.update(id, updateDriverDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.driverService.delete(id);
  }
}
