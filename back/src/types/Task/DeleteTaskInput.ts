import { ArgsType, Field } from "type-graphql";

@ArgsType()
class DeleteTaskInput {

  @Field()
    id!: string;
  }
  

  export default DeleteTaskInput;

