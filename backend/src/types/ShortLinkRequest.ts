import { IsString, IsUrl, IsOptional, IsDateString } from 'class-validator';

export class ShortLinkRequest {
  @IsUrl()
  originalUrl: string;

  @IsString()
  @IsOptional()
  alias?: string;

  @IsDateString()
  expireAt: string;
}

