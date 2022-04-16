import { Inventory } from '@app/common/entities/inventory';
import { Logs } from '@app/common/entities/logs';
import { Settings } from '@app/common/entities/settings';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { InventoryModule } from './inventory/inventory.module';

@Module({
  imports: [InventoryModule,
    TypeOrmModule.forFeature([Logs, Inventory, Settings])],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule { }
