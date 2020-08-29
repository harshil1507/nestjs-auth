import { Resolver, Args, Query, Mutation, Context } from '@nestjs/graphql';
import { UserService } from './user.service';

import { User } from './type/user.type';
import { mongooseId, parseToId } from '../helper/mongoose.service';
import { Compare, Hash } from '../helper/bcrypt.service';
import { SignupInput } from './input/user-signup.input';
import { GraphQLError } from 'graphql';
import { AuthService } from '../auth/auth.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/auth.resolver';
import { errorMessages } from '../helper/messages';
import { check } from 'prettier';
import { LoginInput } from './input/user-login.input';

@Resolver()
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => [User])
  async findUser(@Args('id') id: string, @Context() context) {
    const { _id } = context.req.user;
    console.log('Got request from user id: ', _id);

    const query = {
      _id: mongooseId(id),
    };
    const result = await this.userService.find(query);
  }

  @Mutation(() => User)
  async login(@Args('loginInput') input: LoginInput) {
    const { email, contactNumber, password: passwordPlainText } = input;
    let query;
    email ? (query = { email }) : (query = { contactNumber });
    const result = await this.userService.findOne(query);
    if (!result) throw new GraphQLError(errorMessages.userNotFound);

    const { password, _id } = result;
    const user = parseToId(result);
    const verify = await Compare(passwordPlainText, password);
    if (verify) return { ...user, token: await this.authService.jwtSign(_id) };
  }

  @Mutation(() => User)
  async signup(@Args('signupInput') input: SignupInput) {
    const {
      email,
      contactNumber,
      password,
    }: { email: string; contactNumber: string; password: string } = input;
    const hashedPassword = await Hash(password);

    const checkUserQuery = {
      $or: [{ email }, { contactNumber }],
    };
    console.log(checkUserQuery);
    const checkUser = await this.userService.findOne(checkUserQuery);
    if (checkUser) {
      if (checkUser.contactNumber === contactNumber)
        throw new GraphQLError(errorMessages.contactNumberInUse);
      if (checkUser.email === email)
        throw new GraphQLError(errorMessages.emailInUse);
    }
    const createUserQuery = {
      ...input,
      password: hashedPassword,
    };
    return await this.userService.createUser(createUserQuery);
  }
}
