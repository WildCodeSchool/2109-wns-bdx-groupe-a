import { ArgsType, Field } from "type-graphql";

@ArgsType()
class UpdateProjectInput {
  @Field()
  id!: string;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  picture?: string;

  @Field({ nullable: true })
  startDate?: Date;

  @Field({ nullable: true })
  endDate?: Date;
}

export default UpdateProjectInput;
