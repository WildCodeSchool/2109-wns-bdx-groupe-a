import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";
import Project from "./Project";
import User from "./User";

@Entity()
@ObjectType()
class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: String;

  @Column({ type: 'varchar', length: 255 })
  @Field()
  title!: string;

  @Column({ type: 'longtext' })
  @Field()
  content!: string;

  @Column({ type: 'date' })
  @Field()
  date!: Date;

  @ManyToOne(() => Project, project => project.comments)
    project!: Project;

  @ManyToOne(() => User, user => user.comments)
    user!: User;  
}

export default Comment;