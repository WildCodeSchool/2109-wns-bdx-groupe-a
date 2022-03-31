import { IsEmail } from "class-validator";
import { ArgsType, Field } from "type-graphql";


@ArgsType()
class CreateUserInput {
    @Field()
    firstName!: string;

    @Field()
    lastName!: string;

    @Field()
    @IsEmail()
    email! : string;

    @Field()
    password!:  string; 

    @Field()
    role?: string;
}

export default CreateUserInput