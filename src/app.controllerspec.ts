import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('Given AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = moduleRef.get<AppController>(AppController);
    appService = moduleRef.get<AppService>(AppService);
  });

  it("should be defined", () => {
    expect(appController).toBeDefined();
    expect(appController).not.toBeUndefined();
  })

  describe('When getHello()', () => {
    it('should return correct greeting', () => {
      let res = appController.getHello();
      expect(res).toBe('Hello World!...');
    });
  });
});























