import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";
import { IsNotEmpty } from "class-validator";
// eslint-disable-next-line import/no-cycle
import User from "./User";
// eslint-disable-next-line import/no-cycle
import Project from "./Project";

@Entity()
@ObjectType()
class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { nullable: true })
  id!: string;

  @Column({ type: "varchar", length: 255 })
  @Field()
  @IsNotEmpty({ message: "Ce champ doit être rempli" })
  title!: string;

  @Column({ type: "longtext", nullable: true })
  @Field({ nullable: true })
  description?: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  @Field({ nullable: true })
  attachment?: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  @Field({ nullable: true })
  progress_state?: string;

  @ManyToMany(() => User)
  @JoinTable()
  users?: User[];

  @ManyToOne(() => Project, (project) => project.tasks)
  @Field(() => Project, { nullable: false })
  project?: Project;
}

export default Task;
