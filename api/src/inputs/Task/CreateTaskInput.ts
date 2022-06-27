import { ArgsType, Field } from "type-graphql";


@ArgsType()
class CreateTaskInput {
    @Field()
    title!: string;

    @Field({nullable: true})
    description? : string;

    @Field({nullable: true})
    attachment?:  string; 

    @Field()
    progress_state!: string;
}

export default CreateTaskInput