import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { CreateCustomerDto, UpdateCustomerDto } from '../dto';
import { CustomerRepository } from '../customer.repository';

@Injectable()
export class CustomerService {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async create(createCustomerDto: CreateCustomerDto) {
    const customer = await this.customerRepository.create(createCustomerDto);
    return customer;
  }

  findAll() {
    return this.customerRepository.find({});
  }

  findOne(id: ObjectId) {
    return this.customerRepository.findOne({ _id: id });
  }

  update(id: ObjectId, updateCustomerDto: UpdateCustomerDto) {
    return this.customerRepository.findOneAndUpdate(
      { _id: id },
      updateCustomerDto,
      {
        new: true,
        // projection: {
        //   // __v: 0,
        // },
      },
    );
  }

  remove(id: ObjectId) {
    return this.customerRepository.delete({ _id: id });
  }
}
