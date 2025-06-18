import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ShortLinkService } from './short-link.service';
import { ShortLinkController } from './short-link.controller';
import { AnalyticsService } from './analytics/analitics.service';
import { ClientIpMiddleware } from '../../middleware/client-ip.middleware';
import { AnalyticsController } from './analytics/analytics.controller';

@Module({
  providers: [ShortLinkService, AnalyticsService],
  controllers: [ShortLinkController, AnalyticsController]
})
export class ShortLinkModule {
    configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ClientIpMiddleware)
      .forRoutes('*');
  }
}
