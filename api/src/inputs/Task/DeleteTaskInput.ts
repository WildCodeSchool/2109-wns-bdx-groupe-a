import { ArgsType, Field } from "type-graphql";

@ArgsType()
class DeleteClassInput {
   
    @Field()
    id! : string

}

export default DeleteClassInput