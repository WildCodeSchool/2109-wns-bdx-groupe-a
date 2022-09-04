import { ArgsType, Field } from "type-graphql";

@ArgsType()
class DeleteUserInput {
    @Field()
    id!: string
}

export default DeleteUserInput