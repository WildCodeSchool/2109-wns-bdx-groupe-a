import { Field, ID, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: String;

  @Column({ type: 'varchar', length: 255 })
  @Field()
  name?: string;

  @Column({ type: 'varchar', length: 255 })
  @Field()
  email?: string;

  @Column({ type: 'varchar', length: 255 })
  @Field()
  password?: string;

  @Column({ type: 'varchar', length: 255 })
  @Field({ nullable: true })
  // nullable: true (optionnel:true(peut être null))
  role?: string;
}

export default User;
