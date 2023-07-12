import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { EntryService } from './entry.service';
import { CreateEntryDTO } from './dto/create.dto';
import { UpdateEntryDTO } from './dto/update.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';

@ApiTags('Entry')
@ApiBearerAuth('defaultBearerAuth')
@Controller('entry')
export class EntryController {
  constructor(private readonly entryService: EntryService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() createEntryDto: CreateEntryDTO,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.entryService.create(createEntryDto, file);
  }

  @Get()
  async findAll() {
    return await this.entryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.entryService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEntryDto: UpdateEntryDTO) {
    return this.entryService.update(id, updateEntryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.entryService.delete(id);
  }
}
