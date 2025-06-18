export type CreateShortLinkRequest  = {
  originalUrl: string;
  alias?: string;
  expireAt: Date;
}