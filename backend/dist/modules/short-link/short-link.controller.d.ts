import { ShortLinkRequest } from '../../types/ShortLinkRequest';
import { Response } from 'express';
import { ShortLinkService } from './short-link.service';
import { ShortLinkResponse } from '../../types/ShortLinkresponse';
import { AnalyticsService } from './analytics/analitics.service';
import { ShortLink } from '@prisma/client';
export declare class ShortLinkController {
    private readonly shortLinkService;
    private readonly analyticsService;
    constructor(shortLinkService: ShortLinkService, analyticsService: AnalyticsService);
    shorten(link: ShortLinkRequest): Promise<ShortLinkResponse>;
    deleteShortUrl(shortUrl: string): Promise<ShortLink>;
    getInfo(shortUrl: string): Promise<import("../../types/ShortLinkInfoResponse").ShortLinkInfoResponse>;
    getAll(): Promise<{
        originalUrl: string;
        alias: string;
        expireAt: Date;
        id: number;
        shortUrl: string;
        createdAt: Date;
    }[]>;
    redirect(shortUrl: string, res: Response): Promise<void>;
}
