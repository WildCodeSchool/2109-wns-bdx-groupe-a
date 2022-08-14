import { ArgsType, Field } from "type-graphql";


@ArgsType()
class UpdateTaskInput{
    @Field()
    id!: string

    @Field( { nullable : true} ) 
    title?: string

    @Field( { nullable : true } ) 
    description? : string

    @Field( { nullable : true } )
    attachment? : string

    @Field( { nullable : true } )
    progress_state? : string
}

export default UpdateTaskInput