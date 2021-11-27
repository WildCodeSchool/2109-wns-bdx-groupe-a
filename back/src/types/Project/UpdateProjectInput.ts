import { ArgsType, Field } from "type-graphql";

@ArgsType()
class UpdateProjectInput {
   
   @Field()
    id!: string;

    @Field({ nullable: true})
    title?: string;
  
    @Field({ nullable: true})
    description?: string;

    @Field({ nullable: true})
    picture?: string;
  
    @Field({ nullable: true})
    date_start?: string;

    @Field({ nullable: true})
    date_end?: string;
  }
  
  export default UpdateProjectInput;