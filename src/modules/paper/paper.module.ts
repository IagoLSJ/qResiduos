import { Module } from '@nestjs/common';
import { PaperService } from './paper.service';
import { PaperController } from './paper.controller';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { PaperRepository } from './paper.repository';

@Module({
  imports: [PrismaModule],
  controllers: [PaperController],
  providers: [PaperService, PaperRepository],
  exports: [PaperService],
})
export class PaperModule {}
