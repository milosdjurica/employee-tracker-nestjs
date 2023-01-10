import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type EmployeeDocument = HydratedDocument<Employee>;
// export type EmployeeDocument = Employee & Document;

@Schema({ timestamps: true })
export class Employee {
  @Prop()
  name: string;

  @Prop()
  img: string;

  @Prop()
  role?: string;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
