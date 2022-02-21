import { ArgsType, Field } from 'type-graphql';


@ArgsType()
class UpdateProjectInput{
    @Field()
    id? : string

    @Field()
    title? : string

    @Field()
    description? : string

    @Field()
    picture? : string

    @Field()
    start_date? : string

    @Field()
    end_date? : string

}

export default UpdateProjectInput