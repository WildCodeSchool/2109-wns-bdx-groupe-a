import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable, ManyToOne } from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";
import { IsNotEmpty } from "class-validator";
import User from './User'
import Project from "./Project";


@Entity()
@ObjectType()
class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { nullable: true })
  id!: String;

  @Column({ type: 'varchar', length: 255 })
  @Field()
  @IsNotEmpty({ message : 'Ce champ doit être rempli'})
  title!: string;

  @Column({ type: 'longtext' })
  @Field()
  @IsNotEmpty({ message : 'Ce champ doit être rempli'})
  description!: string;

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
  @Field(() => Project, { nullable : false } )
  project?: Project;
}

export default Task;
