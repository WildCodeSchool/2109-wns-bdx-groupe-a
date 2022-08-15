import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
} from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";
import { IsEmail, IsNotEmpty } from "class-validator";

// eslint-disable-next-line import/no-cycle
import Comment from "./Comment";
// eslint-disable-next-line import/no-cycle
import UserProject from "./UserProject";
// eslint-disable-next-line import/no-cycle
import Project from "./Project";

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
  VISITOR = "visitor",
}

@Entity()
@ObjectType()
class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: string;

  @Column({ type: "varchar", length: 255 })
  @IsNotEmpty()
  @Field()
  firstName!: string;

  @Column({ type: "varchar", length: 255 })
  @IsNotEmpty()
  @Field()
  lastName!: string;

  @Column({ type: "varchar", length: 255 })
  @IsNotEmpty()
  @IsEmail()
  @Field()
  email!: string;

  @Column()
  @IsNotEmpty({ message: "Ce champ doit être rempli" })
  password!: string;

  @Field()
  @Column({ type: "varchar", default: UserRole.VISITOR, length: 255 })
  role?: string;

  @OneToMany(() => UserProject, (up) => up.user)
  @Field(() => Project)
  projectConnection?: Promise<UserProject[]>;

  @OneToMany(() => Comment, (comment) => comment.user)
  comments!: Comment[];

  //   addProject(project: Project) {
  //     if (this.projects == null) {
  //       this.projects = new Array<Project>();
  //     }
  //     this.projects.push(project);
  //   }
}

export default User;
