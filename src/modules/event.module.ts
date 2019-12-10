import { Module } from '@nestjs/common';
import { EventProvider } from '../providers/event.provider';

@Module({
  providers: [EventProvider],
  exports: [EventProvider],
})
export class EventModule {}
