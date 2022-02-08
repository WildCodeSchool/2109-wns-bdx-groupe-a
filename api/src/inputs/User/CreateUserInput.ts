import { InputType } from "type-graphql";
import { PrimaryGeneratedColumn, Column } from "typeorm";


@InputType()
export class CreateUserInput {
    @PrimaryGeneratedColumn()
    id! : number;

    @Column()
    name!: string;

    @Column()
    email! : string;

    @Column()
    password!:  string; 

    @Column()
    role!: string;
}