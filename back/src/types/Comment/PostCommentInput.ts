import { ArgsType, Field } from "type-graphql";

@ArgsType()
class PostCommentInput {
  
    @Field()
    title!: string;
  
    @Field()
    content!: string;
  
    @Field()
    date!: string;
  }
  
  export default PostCommentInput;