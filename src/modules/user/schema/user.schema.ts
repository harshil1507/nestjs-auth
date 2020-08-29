import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ type: String, lowercase: true, required: true })
  email: string;

  @Prop({ type: String })
  password: string;

  @Prop({ type: String, required: true })
  firstName: string;

  @Prop({ type: String })
  lastName: string;

  @Prop({ type: String, required: true })
  contactNumber: string;

  @Prop({ type: Number })
  age: number;
}

export const UserSchema = SchemaFactory.createForClass(User)