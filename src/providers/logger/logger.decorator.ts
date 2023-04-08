import { Inject } from '@nestjs/common';
import { AppLoggerModule } from './logger.module';
import { toLoggerContextToken } from './logger.token';

export const InjectLoggerContext = (context: string) => {
  if (!AppLoggerModule.contextForLoggers.includes(context)) {
    AppLoggerModule.contextForLoggers.push(context);
  }

  return Inject(toLoggerContextToken(context));
};
