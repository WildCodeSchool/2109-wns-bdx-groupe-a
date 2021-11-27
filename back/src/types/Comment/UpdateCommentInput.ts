import { ArgsType, Field } from "type-graphql";

@ArgsType()
class UpdateCommentInput {
   
   @Field()
    id!: string;

    @Field({ nullable: true})
    title?: string;
  
    @Field({ nullable: true})
    content?: string;
  
    @Field({ nullable: true})
    date?: string;
  }
  
  export default UpdateCommentInput;