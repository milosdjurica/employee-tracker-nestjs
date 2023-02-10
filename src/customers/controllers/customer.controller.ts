import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { CustomerService } from '../services/customer.service';
import { ObjectIdPipe } from '@Src/common/pipes/object-id.pipe';
import { CreateCustomerDto, UpdateCustomerDto } from '../dto';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.create(createCustomerDto);
  }

  @Get()
  findAll() {
    return this.customerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ObjectIdPipe) id: ObjectId) {
    return this.customerService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ObjectIdPipe) id: ObjectId,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customerService.update(id, updateCustomerDto);
  }

  @Delete(':id')
  remove(@Param('id', ObjectIdPipe) id: ObjectId) {
    return this.customerService.remove(id);
  }
}
