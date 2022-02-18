import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable, ManyToOne } from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";
import User from './User'
import Project from "./Project";


@Entity()
@ObjectType()
class Task extends BaseEntity {
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
  attachment?: string;

  @Column({ type: 'varchar', length: 255 })
  @Field()
  progress_state?: string;

  @ManyToMany(() => User)
    @JoinTable()
    users!: User[];

    @ManyToOne(() => Project, project => project.tasks)
    project!: Project;
}

export default Task;
