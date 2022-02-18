import { Test, TestingModule } from '@nestjs/testing';
import { TestAppResolver } from './test-app.resolver';
import { TestAppService } from './test-app.service';

describe('TestAppResolver', () => {
  let resolver: TestAppResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestAppResolver, TestAppService],
    }).compile();

    resolver = module.get<TestAppResolver>(TestAppResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
