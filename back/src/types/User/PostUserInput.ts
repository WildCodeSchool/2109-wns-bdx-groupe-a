import { ArgsType, Field } from "type-graphql";

@ArgsType()
class PostUserInput {
  
    @Field()
    name!: string;
  
    @Field()
    email!: string;

    @Field()
    password!: string;
  
    @Field()
    role!: string;
  }
  
  export default PostUserInput;

