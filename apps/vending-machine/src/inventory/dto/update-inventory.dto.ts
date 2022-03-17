import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateInventoryDto } from './create-inventory.dto';

export class UpdateInventoryDto {

    @ApiProperty()
    id: number;

    @ApiProperty()
    stock: number;

}
