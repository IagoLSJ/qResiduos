import { Module } from '@nestjs/common';
import { EntryService } from './entry.service';
import { EntryController } from './entry.controller';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { ProviderModule } from '../provider/provider.module';
import { DestinationModule } from '../destination/destination.module';
import { EntryRepository } from './entry.repository';
import { MulterModule } from '@nestjs/platform-express';
import { FileService } from './file/file.service';
@Module({
  imports: [PrismaModule, ProviderModule, DestinationModule],
  controllers: [EntryController],
  providers: [EntryService, EntryRepository, FileService],
  exports: [EntryService],
})
export class EntryModule {}
