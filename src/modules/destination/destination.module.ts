import { Module } from '@nestjs/common';
import { DestinationService } from './destination.service';
import { DestinationController } from './destination.controller';
import { DestinationRepository } from './destination.repository';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { AddressModule } from '../address/address.module';

@Module({
  imports: [PrismaModule, AddressModule],
  controllers: [DestinationController],
  providers: [DestinationService, DestinationRepository],
  exports: [DestinationService],
})
export class DestinationModule {}
