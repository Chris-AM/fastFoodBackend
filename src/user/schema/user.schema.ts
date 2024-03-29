import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type UsersDocument = Users & Document;

@Schema({ timestamps: true })
export class Users {
  @Prop({ unique: true, default: uuidv4 })
  id: string;
  @Prop({ required: true })
  name: string;
  @Prop({ required: true, unique: true })
  email: string;
  @Prop({ default: '+569' })
  phoneCode: string;
  @Prop({ required: true })
  phoneNumber: number;
  @Prop({ required: true })
  password: string;
  @Prop({ default: '' })
  avatar: string;
  @Prop({ default: ['user'] })
  role: string[];
  @Prop({ default: false })
  google: boolean;
  @Prop({ default: false })
  facebook: boolean;
  @Prop({ default: '' })
  adress: string;
}

export const UsersSchema = SchemaFactory.createForClass(Users);

UsersSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  return object;
});
