import { ArgsType, Field } from 'type-graphql';


@ArgsType()
class UpdateProjectInput{
    @Field()
    id? : string

    @Field({ nullable : true })
    title? : string

    @Field({ nullable : true })
    description? : string

    @Field({ nullable : true })
    picture? : string

    @Field({ nullable : true })
    start_date? : string

    @Field({ nullable : true })
    end_date? : string

    @Field({ nullable : true })
    userId? : string

}

export default UpdateProjectInput