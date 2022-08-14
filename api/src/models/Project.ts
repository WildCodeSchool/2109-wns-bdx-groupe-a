
import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToMany } from "typeorm";
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
  @Field(() => ID)
  id!: string;

  @Column()
  @Field()
  @IsNotEmpty()
  userId! : string

  @Column({ type: 'varchar', length: 255 })
  @Field()
  @IsNotEmpty({ message : 'Ce champ doit être rempli'})
  title!: string;

  @Column({ type: 'longtext' })
  @Field()
  @IsNotEmpty({ message : 'Ce champ doit être rempli'})
  description!: string;


  @Column({ type: 'varchar', length: 255 })
  @Field({nullable: true})
  picture?: string;

  @Column({ type: 'datetime' })
  @Field()
  startDate?: Date;

  @Column({ type: 'datetime' })
  @Field()
  endDate?: Date;

  @OneToMany(() => Task, task => task.project, {cascade: true})
  @Field(() => Task, { nullable : true } )
    tasks!: Task[];

  @OneToMany(() => Comment, comment => comment.project, {cascade: true})
    comments!: Comment[];  

  @ManyToMany(() => User, user => user.projects, {cascade: true})
  @Field(() => [User], {nullable : true})
  users? : User[]
}

export default Project;
