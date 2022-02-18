import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TestAppService } from './test-app.service';
import { TestApp } from './entities/test-app.entity';
import { CreateTestAppInput } from './dto/create-test-app.input';
import { UpdateTestAppInput } from './dto/update-test-app.input';

@Resolver(() => TestApp)
export class TestAppResolver {
  constructor(private readonly testAppService: TestAppService) {}

  @Mutation(() => TestApp)
  createTestApp(
    @Args('createTestAppInput') createTestAppInput: CreateTestAppInput,
  ) {
    return this.testAppService.create(createTestAppInput);
  }

  @Query(() => [TestApp], { name: 'testApp' })
  findAll() {
    return this.testAppService.findAll();
  }

  @Query(() => TestApp, { name: 'testApp' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.testAppService.findOne(id);
  }

  @Mutation(() => TestApp)
  updateTestApp(
    @Args('updateTestAppInput') updateTestAppInput: UpdateTestAppInput,
  ) {
    return this.testAppService.update(
      updateTestAppInput.id,
      updateTestAppInput,
    );
  }

  @Mutation(() => TestApp)
  removeTestApp(@Args('id', { type: () => Int }) id: number) {
    return this.testAppService.remove(id);
  }
}
