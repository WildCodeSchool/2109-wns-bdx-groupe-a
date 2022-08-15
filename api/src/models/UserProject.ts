import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import Project from "./Project";
import User from "./User";

@Entity()
@ObjectType()
class UserProject extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @ManyToOne(() => User)
  @Field(() => User)
  user!: User;

  @ManyToOne(() => Project)
  @Field(() => Project)
  project!: Project;
}

export default UserProject;
