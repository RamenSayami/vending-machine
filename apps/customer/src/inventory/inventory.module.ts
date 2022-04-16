import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { CommonModule } from '@app/common';

@Module({
  imports: [CommonModule],
  controllers: [InventoryController],
  providers: [InventoryService]
})
export class InventoryModule {}
