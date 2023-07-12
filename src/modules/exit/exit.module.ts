import { Module } from '@nestjs/common';
import { ExitService } from './exit.service';
import { ExitController } from './exit.controller';
import { ExitRepository } from './exit.repository';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { DestinationModule } from '../destination/destination.module';
import { ProviderModule } from '../provider/provider.module';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [PrismaModule, DestinationModule, ProviderModule, ProductModule],
  controllers: [ExitController],
  providers: [ExitService, ExitRepository],
  exports: [ExitService],
})
export class ExitModule {}
