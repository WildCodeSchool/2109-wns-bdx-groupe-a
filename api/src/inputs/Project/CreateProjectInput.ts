import { ArgsType, Field } from 'type-graphql';

@ArgsType()
class CreateProjectInput {
  @Field()
  title!: string;

  @Field()
  userId! : string;

  @Field()
  description!: string;

  @Field()
  picture?: string;

  @Field()
  startDate?: Date;

  @Field()
  endDate?: Date;

  @Field()
  userAssignedId!: string;
}

export default CreateProjectInput;
