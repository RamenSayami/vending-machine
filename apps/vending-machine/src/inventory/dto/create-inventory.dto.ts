import { ApiProperty } from '@nestjs/swagger';

export class CreateInventoryDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  stock: number;

  @ApiProperty()
  price: number;
}
