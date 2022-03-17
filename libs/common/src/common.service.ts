import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inventory } from './entity/inventory';
import { GenericResponseUtil } from './utils/generic-response.util';

@Injectable()
export class CommonService {

    constructor(
        @InjectRepository(Inventory)
        private inventoryRepo: Repository<Inventory>,
    ) { }

    async findAllInventory() {
        const inventories = await this.inventoryRepo.find({
            where: {
                isDeleted: false
            }
        })
        return inventories;
    }

    async findOneInventory(id: number) {
        const inventory = await this.inventoryRepo.findOne({
            where: {
                id: id
            }
        })
        if (!inventory)
            throw new BadRequestException('No inventory found');
        else if (inventory.isDeleted)
            throw new BadRequestException('Inventory removed');
        else
            return inventory;
    }

}
