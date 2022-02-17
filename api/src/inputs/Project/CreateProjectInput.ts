import { ArgsType, Field } from "type-graphql";


@ArgsType()
class CreateProjectInput {
    @Field()
    title! : string;

    @Field()
    description! : string;

    @Field()
    picture? : string;

    @Field()
    start_date! : string;

    @Field()
    end_date! : string;

}

export default CreateProjectInput