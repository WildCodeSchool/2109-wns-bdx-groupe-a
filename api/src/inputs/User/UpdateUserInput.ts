import { IsEmail, IsString } from 'class-validator';
import { ArgsType, Field } from 'type-graphql';


@ArgsType()
class UpdateUserInput{
    @Field()
    id? : string

    @Field()
    @IsString()
    firstName? : string

    @Field()
    @IsString()
    lastName? : string

    @Field()
    @IsEmail()
    email? : string

    @Field()
    @IsString()
    password? : string

    @Field()
    role? : string

    @Field()
    projectId? : string
}

export default UpdateUserInput