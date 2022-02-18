import { ArgsType, Field } from "type-graphql";



@ArgsType()
class CreateCommentInput {
    @Field()
    title! : string;

    @Field()
    content! : string; 
    
    @Field()
    date! : Date;
}

export default CreateCommentInput