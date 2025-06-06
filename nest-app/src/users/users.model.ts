import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class User {
  @Prop() name?: string;
  @Prop() date?: Date;
  @Prop({ required: true, index: true, unique: true }) email: string;
  @Prop({ required: true }) password: string;
  @Prop({ default: 'https://cdn-icons-png.flaticon.com/512/266/266033.png' })
  avatar: string;
  @Prop({ enum: ['USER', 'ADMIN'], default: 'USER' }) role: string;
}

type UserType = HydratedDocument<User>;
const UserSchema = SchemaFactory.createForClass(User);
export { UserType, UserSchema };
