import { Module } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { VehicleController } from './vehicle.controller';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { VehicleRepository } from './vehicle.repository';

@Module({
  imports: [PrismaModule],
  controllers: [VehicleController],
  providers: [VehicleService, VehicleRepository],
  exports: [VehicleService]
})
export class VehicleModule {}
