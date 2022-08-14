import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
} from "typeorm";
import { IsNotEmpty } from "class-validator";
// eslint-disable-next-line import/no-cycle
import Task from "./Task";
// eslint-disable-next-line import/no-cycle
import Comment from "./Comment";
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
  start_date?: Date;

  @Column({ type: "date", nullable: true })
  @Field({ nullable: true })
  end_date?: Date;

  @OneToMany(() => Task, (task) => task.project, { cascade: true })
  @Field(() => Task, { nullable: true })
  tasks!: Task[];

  @OneToMany(() => Comment, (comment) => comment.project, { cascade: true })
  comments!: Comment[];

  @ManyToMany(() => User, (user) => user.projects, { cascade: true })
  @Field(() => [User], { nullable: true })
  users?: User[];
}

export default Project;
