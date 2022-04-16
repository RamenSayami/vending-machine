import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { CommonService } from '@app/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inventory } from '@app/common/entities/inventory';
import { Settings } from '@app/common/entities/settings';

@Module({
  imports: [TypeOrmModule.forFeature([Inventory, Settings])],
  controllers: [InventoryController],
  providers: [InventoryService, CommonService],
})
export class InventoryModule {}
