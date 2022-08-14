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
    startDate? : Date

    @Field()
    endDate? : Date

}

export default UpdateProjectInput