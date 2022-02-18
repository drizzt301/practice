import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateTestAppInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
