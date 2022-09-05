import { BaseEntity, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import User from "./User";


@Entity()
class UserSession extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: string;

  @ManyToOne(() => User)
  user!: User;
}

export default UserSession;