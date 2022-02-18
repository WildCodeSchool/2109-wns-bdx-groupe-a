import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";

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
}

export default Task;