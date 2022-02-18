import { CreateTestAppInput } from './create-test-app.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTestAppInput extends PartialType(CreateTestAppInput) {
  @Field(() => Int)
  id: number;
}
