import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import {
  Customer,
  CustomerDocument,
} from '@Src/customer/schema/customer.schema';
import { CreateCustomerDto, UpdateCustomerDto } from './dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<CustomerDocument>,
  ) {}

  create(createCustomerDto: CreateCustomerDto) {
    try {
      const customer = new this.customerModel(createCustomerDto);
      return customer.save();
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    try {
      return this.customerModel.find({});
    } catch (error) {
      throw error;
    }
  }

  findOne(id: ObjectId) {
    try {
      return this.customerModel.findOne({ _id: id });
    } catch (error) {
      throw error;
    }
  }

  update(id: ObjectId, updateCustomerDto: UpdateCustomerDto) {
    try {
      return this.customerModel.findOneAndUpdate(
        { _id: id },
        updateCustomerDto,
        {
          new: true,
          projection: {
            __v: 0,
          },
        },
      );
    } catch (error) {
      throw error;
    }
  }

  remove(id: ObjectId) {
    try {
      return this.customerModel.findOneAndDelete({ _id: id });
    } catch (error) {
      throw error;
    }
  }
}
