import { InputType, Field, Int } from "@nestjs/graphql";

@InputType()
export class LoginInput{
    @Field(()=> String, {nullable: true})
    email: string;

    @Field(()=> String)
    password: string;

    @Field(()=>String, {nullable: true})
    contactNumber: string;
}