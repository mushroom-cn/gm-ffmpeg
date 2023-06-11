import { Injectable, LogLevel, LoggerService, Scope } from '@nestjs/common';
import { logger } from './winston';

@Injectable({ scope: Scope.TRANSIENT })
export class CustomLogger implements LoggerService {
  levels: LogLevel[];
  private context: string;

  constructor(context: string) {
    this.context = context;
  }

  log(message: any, ...optionalParams: any[]) {
    logger.log('info', message, ...[...optionalParams, this.context || '']);
  }

  error(message: any, ...optionalParams: any[]) {
    logger.error(message, ...[...optionalParams, this.context || '']);
  }

  warn(message: any, ...optionalParams: any[]) {
    logger.warn(message, ...[...optionalParams, this.context || '']);
  }

  debug(message: any, ...optionalParams: any[]) {
    logger.debug(message, ...[...optionalParams, this.context || '']);
  }
  verbose(message: any, ...optionalParams: any[]) {
    logger.verbose(message, ...[...optionalParams, this.context || '']);
  }

  info(message: any, ...optionalParams: any[]) {
    logger.info(message, ...[...optionalParams, this.context || '']);
  }

  setLogLevels?(levels: LogLevel[]) {
    this.levels = levels;
  }
}
