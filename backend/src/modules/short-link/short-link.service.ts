import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import {PrismaClient, ShortLink } from '@prisma/client';
import { randomUUID } from 'crypto';
import { v4 } from 'uuid';
import { ShortLinkRequest } from 'src/types/ShortLinkRequest';
import { ShortLinkResponse } from 'src/types/ShortLinkresponse';
import { ShortLinkInfoResponse } from 'src/types/ShortLinkInfoResponse';

@Injectable()
export class ShortLinkService extends PrismaClient{

    constructor(){
        super();
    }

  async createShortLink(shortLinkModel: ShortLinkRequest): Promise<ShortLinkResponse>{
    const shortUrl = shortLinkModel.alias ?? v4().slice(0,20);

    const exists = await this.shortLink.findUnique({
      where: { shortUrl },
    });
    if (exists) {
      throw new ConflictException('Alias or short URL already in use');
    }
    const createdShortLink = await this.shortLink.create({
      data: {
        originalUrl:shortLinkModel.originalUrl,
        shortUrl,
        alias: shortLinkModel.alias ?? '',
        expireAt: new Date(shortLinkModel.expireAt),
      },
    });

    return {shortUrl:createdShortLink.shortUrl}
  }

  async findByShortUrl(shortUrl: string):Promise<ShortLink> {
  return this.shortLink.findUnique({
    where: { 
      shortUrl 
    }
  });
  }

  async getAllShortLinks():Promise<ShortLink[]> {
    return this.shortLink.findMany({});
  }

  async getShortLinkInfo(shortUrl: string):Promise<ShortLinkInfoResponse> {
  const link = await this.shortLink.findUnique({
    where: { shortUrl },
    include: {
      analytics: true,
    },
  });

  if (!link) {
    throw new NotFoundException('Short link not found');
  }

  return {
    originalUrl: link.originalUrl,
    createdAt: link.createdAt,
    clickCount: link.analytics.length,
  };
  }

  async deleteShortLink(shortUrl:string): Promise<ShortLink>{
    const exist:ShortLink = await this.findByShortUrl(shortUrl);

    if(!exist){
      throw new NotFoundException('Short URL not found');
    }

    return this.shortLink.delete({
      where:{
        shortUrl
      }
    });
  }

}
