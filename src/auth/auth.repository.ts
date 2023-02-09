import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '@Src/database/schemas/user.schema';
import { EntityRepository } from '@Src/database/entity.repository';

@Injectable()
export class UserRepository extends EntityRepository<UserDocument> {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {
    super(userModel);
  }
}