import { ArgsType, Field } from "type-graphql";


@ArgsType()
class CreateCommentInput {
    @Field()
    title! : string;

    @Field({nullable: true})
    content? : string; 
    
    @Field({nullable: true})
    date? : Date;
}

export default CreateCommentInput