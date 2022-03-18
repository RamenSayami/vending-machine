import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { SettingService } from './setting.service';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('setting')
@ApiTags('settings')
export class SettingController {
  constructor(private readonly settingService: SettingService) {}

  @Put('coin-value/:value')
  create(@Param('value') value: string) {
    return this.settingService.changeCoinValue(+value);
  }

  @Put('update-coins/:coins')
  updateCoins(@Param('coins') coins: string) {
    return this.settingService.updateCoins(+coins);
  }

}
