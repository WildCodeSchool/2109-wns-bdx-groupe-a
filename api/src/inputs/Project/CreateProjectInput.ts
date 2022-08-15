import { ArgsType, Field } from "type-graphql";

@ArgsType()
class CreateProjectInput {
  @Field()
  title!: string;

  @Field()
  userId!: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  picture?: string;

  @Field({ nullable: true })
  startDate?: Date;

  @Field({ nullable: true })
  endDate?: Date;
}

export default CreateProjectInput;
