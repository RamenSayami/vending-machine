import { ApiProperty } from "@nestjs/swagger";

export class BuyDrinks {

    @ApiProperty()
    inventoryId: number;

    @ApiProperty()
    coins: number;

    @ApiProperty()
    quantity: number;

}