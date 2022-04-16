import { Inventory } from "@app/common/entities/inventory";

export class Reciept{

    item: Inventory;
    price: number;
    quantity: number;
    amount: number;
    
    totalCoins: number;
    totalCurrency: number;

    change: number;
    changeCurrency: number;
}