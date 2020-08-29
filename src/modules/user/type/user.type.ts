import { ObjectType, Field, ID, Int } from "@nestjs/graphql";

@ObjectType()
export class User{
    @Field(()=> ID)
    id: string;
    
    @Field(()=> String)
    email: string;
    
    @Field(()=> String)
    firstName: string;

    @Field(()=> String)
    lastName: string;

    @Field(()=> Int)
    age: number;

    @Field(()=> String)
    contactNumber: string;
    
    @Field(()=> String)
    token: string;

}