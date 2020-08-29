import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { UserService } from '../user/user.service';
import { mongooseId } from '../helper/mongoose.service';
import { GraphQLError } from 'graphql';
import { config } from '../config/app.config';
import { errorMessages } from '../helper/messages';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
  ) {}

  async validateUser(token, req): Promise<any> {
    token = token.replace(`"`, '');
    token = token.replace(`"`, '');
    const query = { _id: mongooseId(token) };
    const result = await this.usersService.findOne(query);
    if (!result) throw new GraphQLError(errorMessages.unauthorized);
    return result;
  }
  async jwtSign(id) {
    return jwt.sign(JSON.stringify(id),config.jwt_secret);
  }
}
