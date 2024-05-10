import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Status} from '~/common/const';

export class OtpDto {
  otp: string;
  status: number;
  expiresAt: Date;
}
@Schema()
export class User {
  @Prop({required: true, unique: true})
  email: string;

  @Prop({required: true})
  password: string;

  @Prop({required: true})
  firstName: string;

  @Prop({required: true})
  lastName: string;

  @Prop({required: true})
  fullName: string;

  @Prop({required: true})
  birthday: string;

  @Prop({required: true})
  roles: string[];

  @Prop({required: true, default: 0})
  point: number;

  @Prop({required: true, default: Status.INVALID})
  status: number;

  @Prop({default: ''})
  accessToken: string;

  @Prop({})
  otp: OtpDto;

  @Prop({type: Date, default: Date.now})
  createdAt: Date;

  @Prop({type: Date, default: Date.now})
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
