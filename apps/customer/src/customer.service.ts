import { Inventory } from '@app/common/entities/inventory';
import { Logs } from '@app/common/entities/logs';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BuyDrinks } from './dto/buy-drinks.model';
import { SettingConstants } from '@app/common/constants/settings.constant';
import { Settings } from '@app/common/entities/settings';
import { ReturnDrinks } from './dto/return-drinks.model';
import { GenericResponseUtil } from '@app/common/utils/generic-response.util';

@Injectable()
export class CustomerService {

  constructor(
    @InjectRepository(Inventory)
    private readonly inventoryRepo: Repository<Inventory>,
    @InjectRepository(Settings)
    private readonly settingsRepo: Repository<Settings>,
    @InjectRepository(Logs)
    private readonly logsRepo: Repository<Logs>,

  ) { }


  async buyDrinks(buyDrinks: BuyDrinks) {

    const inventory = await this.inventoryRepo.findOne({ where: { id: buyDrinks.inventoryId } });
    const coinValueSetting = await this.settingsRepo.findOne({ where: { name: SettingConstants.COIN_VALUE } });


    if (inventory.currentStock < buyDrinks.quantity)
      throw new BadRequestException('Not enough drinks');

    var log = new Logs();
    log.inventory = inventory;
    log.price = inventory.price;
    log.quantity = buyDrinks.quantity;
    log.amount = log.price * log.quantity;

    log.totalCoins = buyDrinks.coins; 
    log.totalCurrency = buyDrinks.coins * coinValueSetting.numberValue;

    log.consumedCoins = log.amount / coinValueSetting.numberValue;
    log.consumedCurrency = log.consumedCoins * coinValueSetting.numberValue;

    log.returnedCoins = buyDrinks.coins - log.consumedCoins;
    log.returnedCurrency = log.returnedCoins * coinValueSetting.numberValue;
    log.desciption = "Buy Drinks";
    if (log.totalCoins < log.consumedCoins)
      throw new BadRequestException('Not enough coin');

    await this.logsRepo.save(log);

    const quantitySum = await this.logsRepo.createQueryBuilder("logs").select("SUM(logs.quantity)", "sum").getRawOne();
    console.log('quantity sum', quantitySum);
    inventory.currentStock = inventory.initalStock - quantitySum.sum;
    await this.inventoryRepo.save(inventory);

    const coinSum = await this.logsRepo.createQueryBuilder("logs").select("SUM(logs.consumedCoins)", "sum").getRawOne();
    console.log('coin sum', coinSum);
    const initialCoins = await this.settingsRepo.findOne({ where: { name: SettingConstants.INITIAL_COINS } })
    const vendingCoins = await this.settingsRepo.findOne({ where: { name: SettingConstants.VENDING_COINS } })

    vendingCoins.numberValue = initialCoins.numberValue + +coinSum.sum;
    vendingCoins.value = vendingCoins.numberValue.toString();
    await this.settingsRepo.save(vendingCoins);

    return GenericResponseUtil.getSuccessResponse(log,'Bought ' + log.quantity +" drinks");
  }


  async returnDrinks(returnDrinks: ReturnDrinks) {
    const inventory = await this.inventoryRepo.findOne({ where: { id: returnDrinks.inventoryId } });
    const coinValueSetting = await this.settingsRepo.findOne({ where: { name: SettingConstants.COIN_VALUE } });

    if (inventory.currentStock + returnDrinks.quantity > inventory.initalStock)
      throw new BadRequestException('Cannot return these many drinks');


    var log = new Logs();
    log.inventory = inventory;
    log.price = inventory.price;
    log.quantity = - returnDrinks.quantity;
    log.amount = - log.price * log.quantity;

    log.totalCoins = log.totalCurrency = 0;
    log.consumedCoins = -log.amount / coinValueSetting.numberValue;
    log.consumedCurrency = -log.amount;

    log.returnedCoins = log.amount / coinValueSetting.numberValue;
    log.returnedCurrency = log.returnedCoins * coinValueSetting.numberValue;
    log.desciption = "Return Drinks";

    const vendingCoins = await this.settingsRepo.findOne({ where: { name: SettingConstants.VENDING_COINS } })

    if (log.returnedCoins > vendingCoins.numberValue)
      throw new BadRequestException('Not enough coins');

    await this.logsRepo.save(log);

    const quantitySum = await this.logsRepo.createQueryBuilder("logs").select("SUM(logs.quantity)", "sum").getRawOne();
    console.log('quantity sum', quantitySum);
    inventory.currentStock = inventory.initalStock - quantitySum.sum;
    await this.inventoryRepo.save(inventory);

    const coinSum = await this.logsRepo.createQueryBuilder("logs").select("SUM(logs.consumedCoins)", "sum").getRawOne();
    console.log('coin sum', coinSum);
    const initialCoins = await this.settingsRepo.findOne({ where: { name: SettingConstants.INITIAL_COINS } })

    vendingCoins.numberValue = initialCoins.numberValue + +coinSum.sum;
    vendingCoins.value = vendingCoins.numberValue.toString();
    await this.settingsRepo.save(vendingCoins);
 
    return { log: log, setting: vendingCoins };

  }

}
