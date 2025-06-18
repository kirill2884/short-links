import { PrismaClient, ShortLink } from '@prisma/client';
import { ShortLinkRequest } from 'src/types/ShortLinkRequest';
import { ShortLinkResponse } from 'src/types/ShortLinkresponse';
import { ShortLinkInfoResponse } from 'src/types/ShortLinkInfoResponse';
export declare class ShortLinkService extends PrismaClient {
    constructor();
    createShortLink(shortLinkModel: ShortLinkRequest): Promise<ShortLinkResponse>;
    findByShortUrl(shortUrl: string): Promise<ShortLink>;
    getAllShortLinks(): Promise<ShortLink[]>;
    getShortLinkInfo(shortUrl: string): Promise<ShortLinkInfoResponse>;
    deleteShortLink(shortUrl: string): Promise<ShortLink>;
}
