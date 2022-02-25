import { ArgsType, Field } from 'type-graphql';


@ArgsType()
class UpdateCommentInput{
    @Field()
    id? : string

    @Field()
    title? : string

    @Field()
    content? : string

    @Field()
    date? : Date

}

export default UpdateCommentInput