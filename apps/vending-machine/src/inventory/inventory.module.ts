import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { CommonService } from '@app/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inventory } from '@app/common/entities/inventory';

@Module({
  imports: [TypeOrmModule.forFeature([Inventory])],
  controllers: [InventoryController],
  providers: [InventoryService, CommonService]
})
export class InventoryModule {}
