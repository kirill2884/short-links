import { Test, TestingModule } from '@nestjs/testing';
import { ShortLinkService } from './short-link.service';

describe('ShortLinkService', () => {
  let service: ShortLinkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShortLinkService],
    }).compile();

    service = module.get<ShortLinkService>(ShortLinkService);
  });

  afterAll(async () => {
    await service.deleteShortLink('my-test-alias');
  })

  it('create uniq shortlink with alias', async () => {
    const data = {
      originalUrl: 'https://google.com',
      alias: 'my-test-alias',
      expireAt: new Date(Date.now() + 1000 * 60 * 60).toISOString(),
    };

    const result = await service.createShortLink(data);
    expect(result.shortUrl).toBe(`my-test-alias`);

    const found = await service.shortLink.findUnique({ where: { shortUrl: 'my-test-alias' } });
    expect(found?.originalUrl).toBe(data.originalUrl);
  });
});