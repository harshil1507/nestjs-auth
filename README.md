A clean and minimal application that demonstrates the use of jwt authentication with GraphQL and NestJs.

How to run the application
Make a ```.env``` file in the root folder and define the following variables :
<ul>
<li>MONGO_URL : Your MongoDB connection string</li>
<li>APP_PORT : The port on which you want to run the app</li>
<li>JWT_SECRET : Secret to be used for jwt encryption and verification</li>
<li>SALT_ROUNDS : No. of salt rounds for use with bcrypt library to store password</li>
</ul>

## Start Application
```bash
yarn start 

or

nest start
```
