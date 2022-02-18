import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import Task from "./Task";
import Comment from "./Comment";

@Entity()
@ObjectType()
class Project extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: String;

  @Column({ type: 'varchar', length: 255 })
  @Field()
  title?: string;

  @Column({ type: 'longtext' })
  @Field()
  description?: string;

  @Column({ type: 'varchar', length: 255 })
  @Field()
  picture?: string;

  @Column({ type: 'date' })
  @Field()
  start_date?: string;

  @Column({ type: 'date' })
  @Field()
  end_date?: string;

  @OneToMany(() => Task, task => task.project)
    tasks!: Task[];

  @OneToMany(() => Comment, comment => comment.project)
    comments!: Comment[];  
}

export default Project;