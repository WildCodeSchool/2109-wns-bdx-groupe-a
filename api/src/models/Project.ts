import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
} from "typeorm";
import { IsNotEmpty } from "class-validator";
// eslint-disable-next-line import/no-cycle
import Task from "./Task";
// eslint-disable-next-line import/no-cycle
import Comment from "./Comment";
// eslint-disable-next-line import/no-cycle
import UserProject from "./UserProject";
// eslint-disable-next-line import/no-cycle
import User from "./User";

@Entity()
@ObjectType()
class Project extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { nullable: true })
  id!: string;

  @Column()
  @Field()
  @IsNotEmpty()
  userId!: string;

  @Column({ type: "varchar", length: 255 })
  @Field()
  @IsNotEmpty({ message: "Ce champ doit être rempli" })
  title!: string;

  @Column({ type: "longtext", nullable: true })
  @Field({ nullable: true })
  @IsNotEmpty({ message: "Ce champ doit être rempli" })
  description?: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  @Field({ nullable: true })
  picture?: string;

  @Column({ type: "date", nullable: true })
  @Field({ nullable: true })
  startDate?: Date;

  @Column({ type: "date", nullable: true })
  @Field({ nullable: true })
  endDate?: Date;

  @OneToMany(() => Task, (task) => task.project, { cascade: true })
  @Field(() => Task, { nullable: true })
  tasks!: Task[];

  @OneToMany(() => Comment, (comment) => comment.project, { cascade: true })
  comments!: Comment[];

  @OneToMany(() => UserProject, (up) => up.project)
  @Field(() => User, { nullable: true })
  userConnection?: UserProject[];
}

export default Project;
