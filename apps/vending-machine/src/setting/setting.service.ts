import { CommonService } from '@app/common';
import { SettingConstants } from '@app/common/constants/settings.constant';
import { Logs } from '@app/common/entities/logs';
import { Settings } from '@app/common/entities/settings';
import { GenericResponseUtil } from '@app/common/utils/generic-response.util';
import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';

@Injectable()
export class SettingService {

  constructor(
    @InjectRepository(Settings)
    private settingsRepo: Repository<Settings>,
    @InjectRepository(Logs)
    private logsRepo: Repository<Logs>,
    private commonService: CommonService
  ) { }

  async findAll() {
    return await this.settingsRepo.find();
  }
  async changeCoinValue(coinValue: number) {
    var coinValueSettings = await this.settingsRepo.findOne({ where: { name: SettingConstants.COIN_VALUE } })
    //check if all inventory has price divisible by new coin value
    var inventories = await this.commonService.findAllInventory();
    var divisibleByNewCoinValue = true;
    inventories.forEach(inventory => {
      if (inventory.price % coinValue != 0)
        divisibleByNewCoinValue = false;
    })
    if (!divisibleByNewCoinValue)
      throw new ConflictException("Some inventory item is not divisible by new coin value. Please make sure they do otherwise refund policy will have conflict");

    coinValueSettings.numberValue = coinValue;
    coinValueSettings.value = coinValue.toString();
    await this.settingsRepo.save(coinValueSettings);
    return GenericResponseUtil.getSuccessMessage("Coin value changed");
  }



  async addCoins(coins: number) {
    //logs involved
    var coinsInVendingMachine = await this.settingsRepo.findOne({ where: { name: SettingConstants.VENDING_COINS } })

    if (coinsInVendingMachine.numberValue < coins)
      throw new BadRequestException('Not enough coins in vending machine. sorry');
    var log = new Logs();
    var coinValue = await this.settingsRepo.findOne({ where: { name: SettingConstants.COIN_VALUE } })
    // log.returnedCoins = coins;
    // log.returnedCurrency = coins * coinValue.numberValue;

    log.consumedCoins = coins;
    log.returnedCurrency = log.consumedCoins * coinValue.numberValue;
    log.returnedCoins = log.returnedCoins = log.quantity = log.price = log.totalCoins = log.totalCurrency = 0;
    log.desciption = "Add Coins";

    await this.logsRepo.save(log);
    coinsInVendingMachine.numberValue += log.consumedCoins;
    coinsInVendingMachine.value = coinsInVendingMachine.numberValue.toString();
    await this.settingsRepo.save(coinsInVendingMachine);
    return GenericResponseUtil.getSuccessResponse({ log: log }, "Coins Added");
  }


  async removeCoins(coins: number) {
    //logs involved
    var coinsInVendingMachine = await this.settingsRepo.findOne({ where: { name: SettingConstants.VENDING_COINS } })

    if (coinsInVendingMachine.numberValue < coins)
      throw new BadRequestException('Not enough coins in vending machine. sorry');
    var log = new Logs();
    var coinValue = await this.settingsRepo.findOne({ where: { name: SettingConstants.COIN_VALUE } })
    log.returnedCoins = coins;
    log.returnedCurrency = coins * coinValue.numberValue;

    log.consumedCoins = -coins;
    log.consumedCurrency = log.consumedCoins * coinValue.numberValue;
    log.amount = log.returnedCurrency;

    log.quantity = log.price = log.totalCoins = log.totalCurrency = 0;
    log.desciption = "Remove Coins";

    await this.logsRepo.save(log);
    
    coinsInVendingMachine.numberValue += log.consumedCoins;
    coinsInVendingMachine.value = coinsInVendingMachine.numberValue.toString();
    await this.settingsRepo.save(coinsInVendingMachine);
    return GenericResponseUtil.getSuccessResponse({ log: log }, "Coins Removed");
  }

}
