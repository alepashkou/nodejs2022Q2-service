import { LogLevel } from '@nestjs/common';

export const generateLogLevels = (level: number): LogLevel[] => {
  const allLevels: LogLevel[] = ['log', 'error', 'warn', 'debug', 'verbose'];
  return allLevels.slice(0, level + 1);
};
