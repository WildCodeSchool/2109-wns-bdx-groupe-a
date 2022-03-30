import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToMany, JoinTable, ManyToMany } from "typeorm";
import { EncryptionTransformer } from 'typeorm-encrypted';
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
// @Unique(['email'])
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

    
    @Column({transformer: new EncryptionTransformer({
        key: 'e41c966f21f9e1577802463f8924e6a3fe3e9751f201304213b2f845d8841d61',
        algorithm: 'aes-256-cbc',
        ivLength: 16,
        iv: 'ff5ac19190424b1d88f9419ef949ae56'
      }), type: "varchar", length: 255}) 
    @IsNotEmpty({ message : 'Ce champ doit être rempli'})
    password!: string;

    @Field()
    @Column({type: 'varchar', default: UserRole.VISITOR, length: 255}) 
    role?: string;

    @ManyToMany(() => Project)
    @JoinTable()
    projects!: Project[];

    @OneToMany(() => Comment, comment => comment.user)
    comments!: Comment[]; 
}

export default User;