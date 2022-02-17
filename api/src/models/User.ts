import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";
//import { EncryptionTransformer } from 'typeorm-encrypted';


@Entity()
@ObjectType()
class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field(() => ID)
    id!: string; 

    @Column({type: 'varchar', length: 255})
    @Field()
    name!: string; 

    @Column({type: 'varchar', length: 255})
    @Field()
    email!: string; 

    @Column({type: 'varchar', length: 255})
    @Field()
    // @Column({transformer: new EncryptionTransformer({
    //     key: 'e41c966f21f9e1577802463f8924e6a3fe3e9751f201304213b2f845d8841d61',
    //     algorithm: 'aes-256-cbc',
    //     ivLength: 16,
    //     iv: 'ff5ac19190424b1d88f9419ef949ae56'
    //   })}) 
    password!: string;

    @Field()
    @Column({type: 'varchar', length: 255}) 
    role!: string;
}

export default User;