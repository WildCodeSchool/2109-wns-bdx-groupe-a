import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
@ObjectType()
export class User extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id!: string; 

    @Field(() => String)
    @Column()
    name!: string; 

    @Field(() => String)
    @Column()
    email!: string; 

    @Field(() => String)
    @Column() 
    password!: string;

    @Field(() => String)
    @Column({ default: 'standard'}) 
    role!: string;
}