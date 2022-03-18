import { CommonModule } from '@app/common';
import { Settings } from '@app/common/entities/settings';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InventoryModule } from './inventory/inventory.module';
import { SettingModule } from './setting/setting.module';

@Module({
  imports: [
    CommonModule,
    InventoryModule,
    TypeOrmModule.forFeature([Settings]),
    SettingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
