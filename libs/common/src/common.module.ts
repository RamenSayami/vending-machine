import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonService } from './common.service';
import { Inventory } from './entity/inventory';
import { Logs } from './entity/logs';
import { Settings } from './entity/settings';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'vending-machine',
      entities: [Settings, Inventory, Logs],
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  providers: [CommonService],
  exports: [CommonService],
})
export class CommonModule {}
