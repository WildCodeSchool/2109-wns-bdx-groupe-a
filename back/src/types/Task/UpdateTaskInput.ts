import { ArgsType, Field } from "type-graphql";

@ArgsType()
class UpdateTaskInput {
   
   @Field()
    id!: string;

    @Field({ nullable: true})
    title?: string;
  
    @Field({ nullable: true})
    description?: string;

    @Field({ nullable: true})
    attachment?: string;
  }
  
  export default UpdateTaskInput;