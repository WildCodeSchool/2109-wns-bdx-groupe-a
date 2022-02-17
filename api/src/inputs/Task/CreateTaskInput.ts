import { ArgsType, Field } from "type-graphql";


@ArgsType()
class CreateTaskInput {
    @Field()
    title!: string;

    @Field()
    description! : string;

    @Field()
    attachment?:  string; 

    @Field()
    progress_state!: string;
}

export default CreateTaskInput