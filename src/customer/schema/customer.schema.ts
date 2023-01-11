import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CustomerDocument = HydratedDocument<Customer>;
// export type CustomerDocument = Customer & Document;

@Schema({ timestamps: true })
export class Customer {
  @Prop()
  name: string;

  @Prop()
  industry: string;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
