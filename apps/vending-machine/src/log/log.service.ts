import { Logs } from '@app/common/entities/logs';
import { GenericResponseUtil } from '@app/common/utils/generic-response.util';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class LogService {
  constructor(
    @InjectRepository(Logs)
    private logRepo: Repository<Logs>,
  ) {}

  // create(createLogDto: CreateLogDto) {
  //   return 'This action adds a new log';
  // }

  async findAll() {
    return GenericResponseUtil.getSuccessResponse(
      await this.logRepo.find(),
      'Fetched logs',
    );
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} log`;
  // }

  // update(id: number, updateLogDto: UpdateLogDto) {
  //   return `This action updates a #${id} log`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} log`;
  // }
}
