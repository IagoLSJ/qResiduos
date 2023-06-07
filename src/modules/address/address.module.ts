import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { AddressRepository } from './address.repository';

@Module({
  imports: [PrismaModule],
  providers: [AddressService, AddressRepository],
  exports: [AddressService],
})
export class AddressModule {}
