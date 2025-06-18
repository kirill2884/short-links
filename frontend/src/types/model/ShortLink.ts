export type ShortLink = {
  id: number;
  originalUrl: string;
  shortUrl: string;
  expireAt: Date;
  alias: string;
  createdAt: Date;
};