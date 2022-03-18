import { SettingConstants } from '@app/common/constants/settings.constant';
import { Settings } from '@app/common/entities/settings';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AppService implements OnApplicationBootstrap{

  constructor(
    @InjectRepository(Settings)
    private settingsRepo: Repository<Settings>,
  ){}

  async onApplicationBootstrap() {
    //setting seeder

    const settings = await this.settingsRepo.find();
    if(settings.length == 0) {
      console.log('seeding settings...');

      var initalCoinSetting = new Settings();
      initalCoinSetting.name =SettingConstants.COINS; 
      initalCoinSetting.isEditable = false;
      initalCoinSetting.value = "100";
      initalCoinSetting.numberValue = 100;
      this.settingsRepo.save(initalCoinSetting);

      var coinValueSetting = new Settings();
      coinValueSetting.name = SettingConstants.COIN_VALUE;
      coinValueSetting.isEditable = true; 
      coinValueSetting.value = "5";
      coinValueSetting.numberValue = 100;
      this.settingsRepo.save(coinValueSetting);
    }
  }


  getHello(): string {
    return 'Hello World!';
  }
}
