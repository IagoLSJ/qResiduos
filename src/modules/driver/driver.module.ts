import { Module } from '@nestjs/common';
import { DriverService } from './driver.service';
import { DriverController } from './driver.controller';
import { DriverRepository } from './driver.repository';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { VehicleModule } from '../vehicle/vehicle.module';

@Module({
  imports: [PrismaModule, VehicleModule],
  controllers: [DriverController],
  providers: [DriverService, DriverRepository],
  exports:[DriverService]
})
export class DriverModule {}
