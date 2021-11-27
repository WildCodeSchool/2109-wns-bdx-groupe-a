import { ArgsType, Field } from "type-graphql";

@ArgsType()
class PostProjectInput {
  
    @Field()
    title!: string;
  
    @Field()
    description!: string;

    @Field()
    picture!: string;
  
    @Field()
    date_start!: string;

    @Field()
    date_end!: string;
  }
  
  export default PostProjectInput;