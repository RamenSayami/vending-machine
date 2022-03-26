import { SettingConstants } from '@app/common/constants/settings.constant';
import { Inventory } from '@app/common/entities/inventory';
import { Settings } from '@app/common/entities/settings';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(Settings)
    private settingsRepo: Repository<Settings>,
    @InjectRepository(Inventory)
    private inventoryRepo: Repository<Inventory>,
  ) {}

  async onApplicationBootstrap() {
    //setting seeder

    const settings = await this.settingsRepo.find();
    if (settings.length == 0) {
      console.log('seeding settings...');

      var initalCoinSetting = new Settings();
      initalCoinSetting.name = SettingConstants.INITIAL_COINS;
      initalCoinSetting.isEditable = false;
      initalCoinSetting.value = '100';
      initalCoinSetting.numberValue = 100;
      this.settingsRepo.save(initalCoinSetting);

      var vendingCoinSetting = new Settings();
      vendingCoinSetting.name = SettingConstants.VENDING_COINS;
      vendingCoinSetting.isEditable = false;
      vendingCoinSetting.value = '100';
      vendingCoinSetting.numberValue = 100;
      this.settingsRepo.save(vendingCoinSetting);

      var coinValueSetting = new Settings();
      coinValueSetting.name = SettingConstants.COIN_VALUE;
      coinValueSetting.isEditable = true;
      coinValueSetting.value = '5';
      coinValueSetting.numberValue = 5;
      this.settingsRepo.save(coinValueSetting);
    }

    const inventories = await this.settingsRepo.find();
    if (inventories.length == 0) {
      var coke = new Inventory();
      coke.name = 'Coke';
      coke.price = 20;
      coke.initalStock = 10;
      coke.currentStock = 10;
      coke.isDeleted = false;
      await this.inventoryRepo.save(coke);

      var pepsi = new Inventory();
      pepsi.name = 'Pepsi';
      pepsi.price = 25;
      pepsi.initalStock = 10;
      pepsi.currentStock = 10;
      pepsi.isDeleted = false;
      await this.inventoryRepo.save(pepsi);

      var dew = new Inventory();
      dew.name = 'Dew';
      dew.price = 30;
      dew.initalStock = 10;
      dew.currentStock = 10;
      dew.isDeleted = false;
      await this.inventoryRepo.save(dew);
    }
  }

  getHello(): string {
    return 'Hello World!';
  }
}
