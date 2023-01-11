import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  Customer,
  CustomerDocument,
} from '@Src/customer/schema/customer.schema';
import { Model, ObjectId } from 'mongoose';
import { CreateCustomerDto, UpdateCustomerDto } from './dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<CustomerDocument>,
  ) {}

  create(createCustomerDto: CreateCustomerDto) {
    const customer = new this.customerModel(createCustomerDto);
    return customer.save();
  }

  findAll() {
    return this.customerModel.find({});
  }

  findOne(id: ObjectId) {
    return this.customerModel.findOne({ id });
  }

  update(id: ObjectId, updateCustomerDto: UpdateCustomerDto) {
    return this.customerModel.findOneAndUpdate({ id }, updateCustomerDto, {
      new: true,
      projection: {
        __v: 0,
      },
    });
  }

  remove(id: ObjectId) {
    return this.customerModel.findOneAndDelete({ id });
  }
}
