
import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { IsNotEmpty } from "class-validator";
// eslint-disable-next-line import/no-cycle
import Task from "./Task";
// eslint-disable-next-line import/no-cycle
import Comment from "./Comment";


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
  start_date?: Date;

  @Column({ type: 'datetime' })
  @Field()
  end_date?: Date;

  @OneToMany(() => Task, task => task.project)
  @Field(() => Task, { nullable : true } )
    tasks!: Task[];

  @OneToMany(() => Comment, comment => comment.project)
    comments!: Comment[];  
}

export default Project;
