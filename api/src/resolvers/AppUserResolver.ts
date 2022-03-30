import { Args, Mutation, Resolver } from "type-graphql";
import AppUser from "../models/AppUser";
import AppUserRepository from "./AppUserRepository";
import SignInInput from "../inputs/User/Login/SignInInput";
import SignUpInput from "../inputs/User/Login/SignUpInput";

@Resolver(AppUserRepository)
class AppUserResolver {
  @Mutation(() => AppUser)
  async signUp(
    @Args() { emailAddress, password }: SignUpInput
  ): Promise<AppUser | undefined> {
    return AppUserRepository.signUp(emailAddress, password);
  }

  @Mutation(() => AppUser)
  async signIn(
    @Args() { emailAddress, password }: SignInInput
  ): Promise<AppUser | undefined> {
    return AppUserRepository.signIn(emailAddress, password);
  }
}

export default AppUserResolver;