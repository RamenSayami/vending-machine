import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CustomerService } from './customer.service';
import { BuyDrinks } from './dto/buy-drinks.model';
import { ReturnDrinks } from './dto/return-drinks.model';

@Controller('customer')
@ApiTags('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) { }

  @Post('buy-drinks')
  buyDrinks(@Body() buyDrinks: BuyDrinks) {
    return this.customerService.buyDrinks(buyDrinks);
  }

  @Post('return-drinks')
  returnDrinks(@Body() returnDrinks: ReturnDrinks) {
    return this.customerService.returnDrinks(returnDrinks);
  }
}
