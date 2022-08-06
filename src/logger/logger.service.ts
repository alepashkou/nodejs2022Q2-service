import { Injectable, LoggerService } from '@nestjs/common';
import { saveLog } from 'src/additional/saveLogs';
@Injectable()
export class LogService implements LoggerService {
  async log(message: string, obj: unknown) {
    console.log(obj, message);
    saveLog('log', message, obj);
  }

  error(message: string, obj: unknown) {
    console.log(obj, message);
    saveLog('error', message, obj);
  }

  warn(message: string, obj: unknown) {
    console.log(obj, message);
    saveLog('warn', message, obj);
  }

  debug(message: string, obj: unknown) {
    console.log(obj, message);
    saveLog('debug', message, obj);
  }

  verbose(message: string, obj: unknown) {
    console.log(obj, message);
    saveLog('verbose', message, obj);
  }
}
