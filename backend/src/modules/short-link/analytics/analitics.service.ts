import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { AnalyticsResponse } from 'src/types/analitycs/AnalitycsResponse';
import { AnalyticType } from 'src/types/analitycs/AnalyticType';

@Injectable()
export class AnalyticsService extends PrismaClient{
  constructor() {
    super()
  }

  async logAnalytics(analityc:AnalyticType): Promise<void> {
    await this.analytics.create({
      data: analityc,
    });
  }

    async getAnalyticsForShortUrl(shortUrl: string): Promise<AnalyticsResponse>  {
    const shortLink = await this.shortLink.findUnique({
      where: { shortUrl },
      include: {
        analytics: {
          orderBy: { date: 'desc' },
          take: 5,
        },
      },
    });

    if (!shortLink) {
      throw new NotFoundException('Short URL not found');
    }

    const clickCount:number = await this.analytics.count({
        where: { shortLinkId: shortLink.id },
    });

    return {
      clickCount, 
      recentIps: shortLink.analytics.map((a) => a.ipAddress),
    };
  }

}
