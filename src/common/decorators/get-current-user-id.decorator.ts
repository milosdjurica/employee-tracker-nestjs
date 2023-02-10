import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ObjectId } from 'mongoose';

export const GetCurrentUserId = createParamDecorator(
  (data: undefined, context: ExecutionContext): ObjectId => {
    const request = context.switchToHttp().getRequest();
    return request.user['sub'];
  },
);
