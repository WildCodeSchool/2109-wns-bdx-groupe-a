import { IsEmail, IsString, MinLength } from "class-validator";
import { ArgsType, Field } from "type-graphql";

@ArgsType()
class SignUpInput {
  @Field()
  @IsString()
  firstName! : string;

  @Field()
  @IsString()
  lastName! : string;

  @Field()
  @IsEmail()
  emailAddress!: string;

  @Field()
  @MinLength(8)
  password!: string;
}

export default SignUpInput;