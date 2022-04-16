import { CommonService } from '@app/common';
import { GenericResponseUtil } from '@app/common/utils/generic-response.util';
import { Injectable } from '@nestjs/common';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';

@Injectable()
export class InventoryService {

  constructor(
    private readonly commonService: CommonService
  ){}

  async findAll() {
    return GenericResponseUtil.getSuccessResponse(await this.commonService.findAllInventory(), 'Fetched all Inventories');
  }

  async findOne(id: number) {
    return GenericResponseUtil.getSuccessResponse(await this.commonService.findOneInventory(id), 'Fetched an Inventory');
  }

}
