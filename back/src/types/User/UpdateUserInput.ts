import { ArgsType, Field } from "type-graphql";

@ArgsType()
class UpdateUserInput {

  @Field()
    id!: string;
  
    @Field({ nullable: true})
    // si pas nullable : true, ne fonctionne pas
    name?: string;
  
    @Field({ nullable: true})
    email?: string;

    @Field({ nullable: true})
    password?: string;
  
    @Field({ nullable: true})
    role?: string;
  }
  
  export default UpdateUserInput;

