import { Controller, Get, Param } from '@nestjs/common';
import { AnalyticsService } from './analitics.service';
import { AnalyticsResponse } from 'src/types/analitycs/AnalitycsResponse';

@Controller('analytics')
export class AnalyticsController {

  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get(':shortUrl')
  async getAnalytics(@Param('shortUrl') shortUrl: string): Promise<AnalyticsResponse> {
    return this.analyticsService.getAnalyticsForShortUrl(shortUrl);
  }

}
