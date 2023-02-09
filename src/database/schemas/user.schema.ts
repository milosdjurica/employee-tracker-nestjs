import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

// export type UserDocument = HydratedDocument<User>;
export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop()
  email: string;

  @Prop()
  hash: string;

  @Prop()
  hashedRt: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
