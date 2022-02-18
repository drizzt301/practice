import { Module } from '@nestjs/common';
import { TestAppService } from './test-app.service';
import { TestAppResolver } from './test-app.resolver';

@Module({
  providers: [TestAppResolver, TestAppService]
})
export class TestAppModule {}
