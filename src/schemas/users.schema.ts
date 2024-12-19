import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
export enum UserRole {
  Admin = 'admin',
  User = 'user',
}
@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ enum: UserRole, default: UserRole.User })
  role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);
