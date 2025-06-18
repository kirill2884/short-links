import { Body, ConflictException, Controller, Delete, Get, NotFoundException, Param, Post, Req, Res } from '@nestjs/common';
import { ShortLinkRequest } from '../../types/ShortLinkRequest';
import { Response} from 'express';
import { ShortLinkService } from './short-link.service';
import { ShortLinkResponse } from '../../types/ShortLinkresponse';
import { AnalyticsService } from './analytics/analitics.service';
import { AnalyticType } from 'src/types/analitycs/AnalyticType';
import { ShortLink } from '@prisma/client';

@Controller()
export class ShortLinkController {

    constructor(private readonly shortLinkService:ShortLinkService
      ,private readonly analyticsService: AnalyticsService,){

    }

  @Post('/shorten')
  async shorten(@Body() link: ShortLinkRequest):Promise<ShortLinkResponse> {
    try {
      return await this.shortLinkService.createShortLink(link) ; 
    } catch (e) {
      if (e instanceof ConflictException) {
        throw new ConflictException('Alias or short URL already in use');
      }
      throw e;
    }
  }

  @Delete('delete/:shortUrl')
  async deleteShortUrl(@Param('shortUrl') shortUrl: string):Promise<ShortLink> {
      return await this.shortLinkService.deleteShortLink(shortUrl); 
  }

  @Get('info/:shortUrl')
  async getInfo(@Param('shortUrl') shortUrl: string) {
  
    return this.shortLinkService.getShortLinkInfo(shortUrl);
  }

  @Get('/all')
  async getAll() {
  
    return this.shortLinkService.getAllShortLinks();
  }

  @Get(':shortUrl')
  async redirect(@Param('shortUrl') shortUrl: string, @Res() res: Response) {
    try {
      const shortLink = await this.shortLinkService.findByShortUrl(shortUrl);

      if (!shortLink || new Date(shortLink.expireAt) < new Date()) {
        throw new NotFoundException('Short URL not found or expired');
      }
   
      const analytic:AnalyticType = {
        date:new Date(),
        ipAddress:res.req.clientIp,
        shortLinkId:shortLink.id
      }
      await this.analyticsService.logAnalytics(analytic);
        console.log('Redirecting:', shortUrl, res.req.clientIp);
      return res.redirect(shortLink.originalUrl);
    } catch (e) {
      throw e;
    }
  }

}
