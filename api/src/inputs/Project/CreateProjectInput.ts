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
  start_date!: Date;

  @Field()
  end_date!: Date;
}

export default CreateProjectInput;
