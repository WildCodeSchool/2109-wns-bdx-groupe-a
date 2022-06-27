import { IsNotEmpty } from "class-validator";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";
// eslint-disable-next-line import/no-cycle
import Project from "./Project";
// eslint-disable-next-line import/no-cycle
import User from "./User";


@Entity()
@ObjectType()
class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { nullable: true})
  id!: String;

  @Column({ type: 'varchar', length: 255 })
  @Field()
  @IsNotEmpty({ message : 'Ce champ doit être rempli'})
  title!: string;

  @Column({ type: 'longtext' })
  @Field()
  @IsNotEmpty({ message : 'Ce champ doit être rempli'})
  content?: string;

  @Column({ type: 'date' })
  @Field()
  date!: Date;

  @ManyToOne(() => Project, project => project.comments)
    project!: Project;

  @ManyToOne(() => User, user => user.comments)
    user!: User;  
}

export default Comment;
