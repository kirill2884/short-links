import { AnalyticsService } from './analitics.service';
import { AnalyticsResponse } from 'src/types/analitycs/AnalitycsResponse';
export declare class AnalyticsController {
    private readonly analyticsService;
    constructor(analyticsService: AnalyticsService);
    getAnalytics(shortUrl: string): Promise<AnalyticsResponse>;
}
