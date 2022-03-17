import { CommonService } from '@app/common';
import { Inventory } from '@app/common/entity/inventory';
import { GenericResponseUtil } from '@app/common/utils/generic-response.util';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';

@Injectable()
export class InventoryService {

  constructor(
    @InjectRepository(Inventory)
    private inventoryRepo: Repository<Inventory>,
    private readonly commonService: CommonService,
  ) { }

  async createNewInventory(createInventoryDto: CreateInventoryDto) {
    var inventory = new Inventory();
    inventory.name = createInventoryDto.name;
    inventory.price = createInventoryDto.price;
    inventory.initalStock = createInventoryDto.stock;
    inventory.currentStock = createInventoryDto.stock;
    inventory.isDeleted = false;
    await this.inventoryRepo.save(inventory);
    return GenericResponseUtil.getSuccessResponse(inventory, "Inventory Added");
  }

  async findAll() {
    return GenericResponseUtil.getSuccessResponse(await this.commonService.findAllInventory(), "Inventories fetched");
  }

  async findOne(id: number) {
    return GenericResponseUtil.getSuccessResponse(await this.commonService.findOneInventory(id), "Inventory fetched");
  }

  update(id: number, updateInventoryDto: UpdateInventoryDto) {
    //TODO logs ko sich
    // enter logs first then add/ remove items and update currentStock as well.
    return `This action updates a #${id} inventory`;
  }

  async remove(id: number) {
    var inventory = await this.commonService.findOneInventory(id);
    inventory.isDeleted = true;
    await this.inventoryRepo.save(inventory);
    return GenericResponseUtil.getSuccessMessage('Inventory removed');
  }
}
