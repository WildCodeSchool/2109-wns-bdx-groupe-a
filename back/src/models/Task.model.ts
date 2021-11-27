import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}

export default Task;