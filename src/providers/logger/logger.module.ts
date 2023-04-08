import { DynamicModule } from '@nestjs/common';
import { createLoggerProviders } from './logger.provider';
import { Logger } from './logger.service';

export class AppLoggerModule {
  static contextForLoggers: string[] = new Array<string>();
  static forRoot(): DynamicModule {
    const contextLoggerProviders = createLoggerProviders(
      this.contextForLoggers,
    );

    return {
      module: AppLoggerModule,
      providers: [Logger, ...contextLoggerProviders],
      exports: [Logger, ...contextLoggerProviders],
      global: true,
    };
  }
}
