//library imports
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';

//local imports
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { config } from './modules/config/app.config';
import { UserModule } from './modules/user/user.module';

console.log('config', config);

@Module({
  imports: [
    MongooseModule.forRoot(config.mongo_url),
    GraphQLModule.forRoot({ autoSchemaFile: 'schema.gql' }),
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
