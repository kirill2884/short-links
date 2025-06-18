import { PrismaClient } from '@prisma/client';
import { AnalyticsResponse } from 'src/types/analitycs/AnalitycsResponse';
import { AnalyticType } from 'src/types/analitycs/AnalyticType';
export declare class AnalyticsService extends PrismaClient {
    constructor();
    logAnalytics(analityc: AnalyticType): Promise<void>;
    getAnalyticsForShortUrl(shortUrl: string): Promise<AnalyticsResponse>;
}
