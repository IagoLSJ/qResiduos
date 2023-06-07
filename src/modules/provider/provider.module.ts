import { Module } from '@nestjs/common';
import { ProviderService } from './provider.service';
import { ProviderController } from './provider.controller';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { ProviderRepository } from './provider.repository';
import { AddressModule } from '../address/address.module';

@Module({
  imports: [PrismaModule, AddressModule],
  controllers: [ProviderController],
  providers: [ProviderService, ProviderRepository],
  exports: [ProviderService],
})
export class ProviderModule {}
