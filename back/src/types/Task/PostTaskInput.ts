import { ArgsType, Field } from "type-graphql";

@ArgsType()
class PostTaskInput {
  
    @Field()
    title!: string;
  
    @Field()
    description!: string;

    @Field()
    attachment!: string;
  
  }
  
  export default PostTaskInput;