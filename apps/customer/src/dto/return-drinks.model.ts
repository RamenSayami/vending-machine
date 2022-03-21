import { ApiProperty } from "@nestjs/swagger";

export class ReturnDrinks{

    @ApiProperty()
    inventoryId: number;

    @ApiProperty()
    quantity: number;

}