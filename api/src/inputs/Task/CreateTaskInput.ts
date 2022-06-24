import { ArgsType, Field } from "type-graphql";
import Project from "../../models/Project";


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

    @Field()
    projectId!: string;
}

export default CreateTaskInput