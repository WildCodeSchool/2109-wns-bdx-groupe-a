import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToMany, JoinTable, ManyToMany } from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";
import { IsEmail, IsNotEmpty } from "class-validator";

// eslint-disable-next-line import/no-cycle
import Comment from "./Comment";
// eslint-disable-next-line import/no-cycle
import Project from "./Project";


export enum UserRole {
    ADMIN = 'admin', 
    USER = 'user',
    VISITOR = 'visitor'
}

@Entity()
@ObjectType()

class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field(() => ID)
    id!: string; 

    @Column({type: 'varchar', length: 255})
    @IsNotEmpty()
    @Field()
    firstName!: string; 

    @Column({type: 'varchar', length: 255})
    @IsNotEmpty()
    @Field()
    lastName!: string; 

    @Column({type: 'varchar', length: 255})
    @IsNotEmpty()
    @IsEmail()
    @Field()
    email!: string; 

    
    @Column() 
    @IsNotEmpty({ message : 'Ce champ doit être rempli'})
    password!: string;

    @Field()
    @Column({type: 'varchar', default: UserRole.VISITOR, length: 255}) 
    role?: string;

    @ManyToMany(() => Project, project => project.users)
    @JoinTable()
    @Field(() => [Project], { nullable : true } )
    projects?: Project[];

    @OneToMany(() => Comment, comment => comment.user)
    comments!: Comment[]; 
}

export default User;