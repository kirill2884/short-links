// app.e2e-spec.ts (или short-link.e2e-spec.ts)
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { ShortLinkService } from '../src/modules/short-link/short-link.service';

describe('ShortLinkController (e2e)', () => {
  let app: INestApplication;
  let service: ShortLinkService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    service = moduleFixture.get<ShortLinkService>(ShortLinkService);
    await app.init();

    await service.shortLink.create({
      data: {
        originalUrl: 'https://longlink.com/my-long-link',
        shortUrl: 'test-short-link',
        alias: 'test-short-link',
        expireAt: new Date(Date.now() + 1000 * 60 * 60),
      },
    });
  });

  afterAll(async () => {
    await service.deleteShortLink('test-short-link')
  })

  it('redirect by shortlink', async () => {
    const res = await request(app.getHttpServer()).get('/test-short-link').expect(302);
    expect(res.headers.location).toBe('https://longlink.com/my-long-link');
  });

  afterAll(async () => {
    await service.shortLink.deleteMany({ where: { shortUrl: 'test123' } });
    await app.close();
  });
});