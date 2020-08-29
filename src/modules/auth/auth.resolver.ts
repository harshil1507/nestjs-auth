import {
  ExecutionContext,
  Injectable,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';
import { config } from '../config/app.config';
import { AuthService } from './auth.service';
import { errorMessages } from '../helper/messages';

@Injectable()
export class JwtAuthGuard {
  constructor(private jwtService: AuthService) {}
  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    if (!req.headers.authorization) {
      throw new GraphQLError(errorMessages.noToken);
    }
    req.user = await this.validateToken(req.headers.authorization, req);
    return true;
  }

  async validateToken(auth: string, req) {
    if (auth.split(' ')[0] !== 'Bearer') {
      throw new GraphQLError(errorMessages.tokenFormatError);
    }
    const token = auth.split(' ')[1];
    try {
      const res = jwt.verify(token, config.jwt_secret);

      const result = await this.jwtService.validateUser(res, req);
      return result;
    } catch (err) {
      throw new GraphQLError(errorMessages.couldNotVerify);
    }
  }
}
