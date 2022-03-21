import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { ApiTags } from '@nestjs/swagger';
import { CommonService } from '@app/common';
import { GenericResponseUtil } from '@app/common/utils/generic-response.util';

@Controller('inventory')
@ApiTags('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService
    ) { }

  @Post()
  createNewInventory(@Body() createInventoryDto: CreateInventoryDto) {
    return this.inventoryService.createNewInventory(createInventoryDto);
  }

  @Get()
  findAll() {
    return this.inventoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inventoryService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateInventoryDto: UpdateInventoryDto) {
  //   return this.inventoryService.update(+id, updateInventoryDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inventoryService.remove(+id);
  }
}
