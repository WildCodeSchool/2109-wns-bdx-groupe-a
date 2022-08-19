/* eslint-disable import/no-cycle */
import { BaseEntity, Entity, JoinColumn, ManyToOne } from "typeorm";
import Project from "./Project";
import User from "./User";

@Entity()
class UserProject extends BaseEntity {
  @ManyToOne(() => User, (user) => user.projectConnection, { primary: true })
  @JoinColumn({ name: "userId" })
  user!: Promise<User>;

  @ManyToOne(() => Project, (project) => project.userConnection, {
    primary: true,
  })
  @JoinColumn({ name: "projectId" })
  project!: Promise<Project>;
}

export default UserProject;