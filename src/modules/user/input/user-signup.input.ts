import { InputType, Field, Int } from "@nestjs/graphql";

@InputType()
export class SignupInput{
    @Field(()=> String)
    email: string;

    @Field(()=> String)
    password: string;

    @Field(()=> String)
    contactNumber: string;

    @Field(()=> String)
    firstName: string;

    @Field(()=> String, {nullable: true})
    lastName: string;

    @Field(()=> Int, {nullable: true})
    age: number;
}