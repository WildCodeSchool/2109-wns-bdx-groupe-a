import { Args, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { CustomContext } from "../custom-context";

import SignInInput from "../inputs/User/Login/SignInInput";
import SignUpInput from "../inputs/User/Login/SignUpInput";
import AppUserRepository from "./AppUserRepository";
import AppUser from "../models/AppUser";

@Resolver(AppUserRepository)
class AppUserResolver {

  @Mutation(() => AppUser)
  async signUp(
    @Args() { firstName, lastName, emailAddress, password }: SignUpInput
  ): Promise<AppUser | undefined> {
    return AppUserRepository.signUp(firstName, lastName, emailAddress, password);
  }

  @Mutation(() => AppUser)
  async signIn(
    @Args() { emailAddress, password }: SignInInput,
    @Ctx() { onSessionCreated }: CustomContext
  ): Promise<AppUser | undefined> {
    return AppUserRepository.signIn(emailAddress, password, onSessionCreated);
  }

  @Query(() => AppUser)
  async myProfile(@Ctx() { appUser }: CustomContext) : Promise<AppUser | null> {
    return appUser;
  }
}

export default AppUserResolver;