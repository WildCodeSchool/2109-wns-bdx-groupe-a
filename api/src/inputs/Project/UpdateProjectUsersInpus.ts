import { ArgsType, Field } from "type-graphql";

@ArgsType()
class UpdateProjectUsersInput {
  @Field(() => String)
  projectId!: string;

  @Field(() => String)
  usersId!: string;
}

export default UpdateProjectUsersInput;
