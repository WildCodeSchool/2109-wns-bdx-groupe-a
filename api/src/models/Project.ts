
import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import Task from "./Task";
import Comment from "./Comment";
import { IsNotEmpty } from "class-validator";

@Entity()
@ObjectType()
class Project extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: string;

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

  @Column({ type: 'date' })
  @Field()
  start_date?: Date;

  @Column({ type: 'date' })
  @Field()
  end_date?: Date;

  @OneToMany(() => Task, task => task.project)
    tasks!: Task[];

  @OneToMany(() => Comment, comment => comment.project)
    comments!: Comment[];  
}

export default Project;
