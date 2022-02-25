import { ArgsType, Field } from "type-graphql";

@ArgsType()
class DeleteCommentInput {
    @Field()
    id!: string
}

export default DeleteCommentInput