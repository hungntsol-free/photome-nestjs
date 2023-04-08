import { Provider } from '@nestjs/common';
import { Logger } from './logger.service';
import { toLoggerContextToken } from './logger.token';

const loggerFactory = (logger: Logger, context: string): Logger => {
  if (context) {
    logger.setContext(`App${context}`);
  }

  return logger;
};

const createProvider = (context: string): Provider<Logger> => {
  return {
    provide: toLoggerContextToken(context),
    useFactory: (logger) => loggerFactory(logger, context),
    inject: [Logger],
  };
};

/**
 * Create LoggerProvider for each given context.
 */
export const createLoggerProviders = (
  contexts: string[],
): Array<Provider<Logger>> => {
  return contexts.map((ctx) => createProvider(ctx));
};
