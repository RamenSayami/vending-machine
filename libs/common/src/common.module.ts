import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonService } from './common.service';
import { Inventory } from './entity/inventory';
import { Logs } from './entity/logs';
import { Settings } from './entity/settings';
import { GenericResponseUtil } from './utils/generic-response.util';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [Settings, Inventory, Logs],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Inventory]),
  ],
  providers: [CommonService],
  exports: [CommonService],
})
export class CommonModule {}
