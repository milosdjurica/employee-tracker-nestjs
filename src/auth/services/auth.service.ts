import { Injectable } from '@nestjs/common';
import { LoginDto, RegisterDto } from '../dto';
import * as bcrypt from 'bcrypt';
import { Tokens } from '../types';
import { UserRepository } from '../auth.repository';

@Injectable()
export class AuthService {
  constructor(private readonly usersRepository: UserRepository) {}

  hashData(data: string) {
    return bcrypt.hash(data, 10);
  }

  async register(dto: RegisterDto): Promise<Tokens> {
    const hash = await this.hashData(dto.password);

    const user = await this.usersRepository.create({ email: dto.email, hash });





    return { access_token: 'sad', refresh_token: 'sad' };
    // return user.save();
  }

  login(dto: LoginDto) {}

  logOut() {}

  refreshTokens() {}
}
