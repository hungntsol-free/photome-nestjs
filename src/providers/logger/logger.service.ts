import { Injectable, Logger as NestLogger, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class Logger extends NestLogger {
  debug(message: string): void {
    super.debug(message);
  }

  verbose(message: string): void {
    super.verbose(message);
  }

  log(message: string): void {
    super.log(message);
  }

  warn(message: unknown): void {
    super.warn(message);
  }

  error(message: string, stack?: string): void {
    super.error(message, stack);
  }

  setContext(context: string) {
    super.context = context;
  }
}
