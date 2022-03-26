import { CommonModule } from '@app/common';
import { Inventory } from '@app/common/entities/inventory';
import { Settings } from '@app/common/entities/settings';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InventoryModule } from './inventory/inventory.module';
import { SettingModule } from './setting/setting.module';
import { LogModule } from './log/log.module';

@Module({
  imports: [
    CommonModule,
    InventoryModule,
    TypeOrmModule.forFeature([Settings, Inventory]),
    SettingModule,
    LogModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
