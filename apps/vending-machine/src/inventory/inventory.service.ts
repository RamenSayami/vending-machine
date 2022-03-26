import { CommonService } from '@app/common';
import { SettingConstants } from '@app/common/constants/settings.constant';
import { Inventory } from '@app/common/entities/inventory';
import { Settings } from '@app/common/entities/settings';
import { GenericResponseUtil } from '@app/common/utils/generic-response.util';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Inventory)
    private inventoryRepo: Repository<Inventory>,
    @InjectRepository(Settings)
    private settingsRepo: Repository<Settings>,
    private readonly commonService: CommonService,
  ) {}

  async createNewInventory(createInventoryDto: CreateInventoryDto) {
    const inventory = new Inventory();
    inventory.name = createInventoryDto.name;
    inventory.price = createInventoryDto.price;
    inventory.initalStock = createInventoryDto.stock;
    inventory.currentStock = createInventoryDto.stock;
    inventory.isDeleted = false;
    await this.inventoryRepo.save(inventory);
    return GenericResponseUtil.getSuccessResponse(inventory, 'Inventory Added');
  }

  async findAll() {
    return GenericResponseUtil.getSuccessResponse(
      await this.commonService.findAllInventory(),
      'Inventories fetched',
    );
  }

  async findOne(id: number) {
    return GenericResponseUtil.getSuccessResponse(
      await this.commonService.findOneInventory(id),
      'Inventory fetched',
    );
  }

  async update(id: number, updateInventoryDto: UpdateInventoryDto) {
    const inventory = await this.commonService.findOneInventory(id);

    const coinValue = await this.settingsRepo.findOne({
      where: { name: SettingConstants.COIN_VALUE },
    });
    if (!(updateInventoryDto.price % coinValue.numberValue == 0))
      throw new BadRequestException(
        'Price should be divisible by coin value: Rs.' + coinValue.value,
      );

    inventory.price = updateInventoryDto.price;
    await this.inventoryRepo.save(inventory);
    return GenericResponseUtil.getSuccessResponse(
      inventory,
      'Inventory updated',
    );
  }

  async remove(id: number) {
    const inventory = await this.commonService.findOneInventory(id);
    inventory.isDeleted = true;
    await this.inventoryRepo.save(inventory);
    return GenericResponseUtil.getSuccessMessage('Inventory removed');
  }
}
