import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LogService } from './log.service';

@Controller('logs')
@ApiTags('logs')
export class LogController {
  constructor(private readonly logService: LogService) {}

  // @Post()
  // create(@Body() createLogDto: CreateLogDto) {
  //   return this.logService.create(createLogDto);
  // }

  @Get()
  findAll() {
    return this.logService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.logService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateLogDto: UpdateLogDto) {
  //   return this.logService.update(+id, updateLogDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.logService.remove(+id);
  // }
}
