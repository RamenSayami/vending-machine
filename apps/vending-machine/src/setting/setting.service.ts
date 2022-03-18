import { CommonService } from '@app/common';
import { SettingConstants } from '@app/common/constants/settings.constant';
import { Settings } from '@app/common/entities/settings';
import { GenericResponseUtil } from '@app/common/utils/generic-response.util';
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';

@Injectable()
export class SettingService {

  constructor(
    @InjectRepository(Settings)
    private settingsRepo: Repository<Settings>,
    private commonService: CommonService
  ){}

  async changeCoinValue(coinValue: number) {
    var coinValueSettings = await this.settingsRepo.findOne({
      where : {
        name : SettingConstants.COIN_VALUE
      }
    })
    //check if all inventory has price divisible by new coin value
    var inventories = await this.commonService.findAllInventory();
    var divisibleByNewCoinValue = true;
    inventories.forEach(inventory => {
      if(inventory.price % coinValue != 0)
        divisibleByNewCoinValue = false;
    })
    if(!divisibleByNewCoinValue) 
      throw new ConflictException("Some inventory item is not divisible by new coin value. Please make sure they do otherwise refund policy will have conflict");

    coinValueSettings.numberValue = coinValue;
    coinValueSettings.value = coinValue.toString();
    await this.settingsRepo.save(coinValueSettings);
    return GenericResponseUtil.getSuccessMessage("Coin value changed");
  }

  updateCoins(coins: number) {
    //logs involved

    return `This action returns all setting`;
  }

}
