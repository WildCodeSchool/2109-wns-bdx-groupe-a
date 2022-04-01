import { BaseEntity, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import User from "./User";


@Entity()
class UserSession extends BaseEntity {
  @PrimaryColumn("varchar", { length: 32 })
  id!: string;

  @ManyToOne(() => User)
  user!: User;
}

export default UserSession;