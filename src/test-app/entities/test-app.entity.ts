import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class TestApp {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
