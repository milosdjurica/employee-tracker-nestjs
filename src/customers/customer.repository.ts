import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityRepository } from '@Src/database/entity.repository';
import { Customer, CustomerDocument } from '@Src/database/schemas/customer.schema';

@Injectable()
export class CustomerRepository extends EntityRepository<CustomerDocument> {
  constructor(
    @InjectModel(Customer.name)
    private customerModel: Model<CustomerDocument>,
  ) {
    super(customerModel);
  }
}