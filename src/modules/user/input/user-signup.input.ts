import { InputType, Field, Int } from "@nestjs/graphql";

@InputType()
export class LoginInput{
    @Field(()=> String)
    email: string;

    @Field(()=> String)
    password: string;

    @Field(()=> String)
    contactNumber: string;

    @Field(()=> String)
    firstName: string;

    @Field(()=> String)
    lastName: string;

    @Field(()=> Int)
    age: number;
}