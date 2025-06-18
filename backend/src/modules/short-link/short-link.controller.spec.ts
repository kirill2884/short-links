import { Test, TestingModule } from '@nestjs/testing';
import { ShortLinkController } from './short-link.controller';
import { ShortLinkService } from './short-link.service';
import { AnalyticsService } from './analytics/analitics.service';

describe('ShortLinkController', () => {
  let controller: ShortLinkController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShortLinkController],
      providers: [
        {
          provide: ShortLinkService,
          useValue: {
            createShortLink: jest.fn(),
            getOriginalUrl: jest.fn(),
            getAllShortLinks: jest.fn(),
            getShortLinkInfo: jest.fn(),
            findByShortUrl: jest.fn(),
            deleteShortLink: jest.fn(),
          },
        },
        {
          provide: AnalyticsService,
          useValue: {
            logAnalytics: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ShortLinkController>(ShortLinkController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
