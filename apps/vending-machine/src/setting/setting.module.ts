import { Module } from '@nestjs/common';
import { SettingService } from './setting.service';
import { SettingController } from './setting.controller';
import { CommonModule, CommonService } from '@app/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Settings } from '@app/common/entities/settings';
import { Inventory } from '@app/common/entities/inventory';

@Module({
  imports: [TypeOrmModule.forFeature([Settings, Inventory])],
  controllers: [SettingController],
  providers: [SettingService, CommonService]
})
export class SettingModule {}
