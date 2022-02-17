import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";

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
  date!: string;
}

export default Comment;