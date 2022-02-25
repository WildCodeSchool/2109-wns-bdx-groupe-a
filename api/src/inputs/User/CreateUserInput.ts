import { IsEmail, IsNotEmpty, Max, Min } from "class-validator";
import { ArgsType, Field } from "type-graphql";


@ArgsType()
class CreateUserInput {
    @Field()
    @IsNotEmpty({ message : 'Ce champ doit être rempli'})
    @Max(25)
    firstName!: string;

    @Field()
    @IsNotEmpty({ message : 'Ce champ doit être rempli'})
    @Max(25)
    lastName!: string;

    @Field()
    @IsEmail()
    email! : string;

    @Field()
    @Min(6)
    @Max(25)
    password!:  string; 

    @Field()
    role?: string;
}

export default CreateUserInput