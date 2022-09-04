import { ArgsType, Field } from "type-graphql";

@ArgsType()
class DeleteProjectInput {
    @Field()
    id!: string
}

export default DeleteProjectInput