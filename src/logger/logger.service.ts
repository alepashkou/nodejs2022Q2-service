import { ConsoleLogger, Injectable } from '@nestjs/common';
import { generateLogLevels } from 'src/additional/logLevel';
import { saveLog } from 'src/additional/saveLogs';
@Injectable()
export class LogService extends ConsoleLogger {
  constructor() {
    super();
    this.setLogLevels([...generateLogLevels(+process.env.LOG_LEVEL)]);
  }
  async log(message: string, obj: unknown) {
    saveLog('log', message, obj);
    super.log(message, obj);
  }

  error(message: string, obj: unknown) {
    if (+process.env.LOG_LEVEL >= 1) {
      saveLog('error', message, obj);
      super.error(message, obj);
    }
  }

  warn(message: string, obj: unknown) {
    if (+process.env.LOG_LEVEL >= 2) {
      saveLog('warn', message, obj);
      super.warn(message, obj);
    }
  }

  debug(message: string, obj: unknown) {
    if (+process.env.LOG_LEVEL >= 3) {
      saveLog('debug', message, obj);
      super.debug(message, obj);
    }
  }

  verbose(message: string, obj: unknown) {
    if (+process.env.LOG_LEVEL >= 4) {
      saveLog('verbose', message, obj);
      super.verbose(message, obj);
    }
  }
}
