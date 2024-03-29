
import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToMany } from "typeorm";
import { IsNotEmpty } from "class-validator";
// eslint-disable-next-line import/no-cycle
import Task from "./Task";
// eslint-disable-next-line import/no-cycle
import Comment from "./Comment";
import User from './User';


@Entity()
@ObjectType()
class Project extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: string;

  @Column()
  @Field()
  @IsNotEmpty()
  creatorId! : string

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
  picture?: string;

  @Column()
  @Field()
  start_date?: string;

  @Column()
  @Field()
  end_date?: string;

  @OneToMany(() => Task, task => task.project)
  @Field(() => Task, { nullable : true } )
    tasks?: Task[];

  @OneToMany(() => Comment, comment => comment.project)
    comments?: Comment[];  

  @ManyToMany(() => User, user => user.projects)
  @Field(() => [User], { nullable : true } )
  users?: User[];
}

export default Project;
