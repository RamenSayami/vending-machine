import { ApiProperty } from '@nestjs/swagger';

export class UpdateInventoryDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  price: number;
}
