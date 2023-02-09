import { Injectable } from '@nestjs/common';
import { LoginDto, RegisterDto } from '../dto';
import * as bcrypt from 'bcrypt';
import { Tokens } from '../types';
import { UserRepository } from '../auth.repository';
import { ObjectId } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto): Promise<Tokens> {
    const hash = await this.hashData(dto.password);

    const user = await this.usersRepository.create({ email: dto.email, hash });
    const tokens = await this.getTokens(user['_id'], user.email);
    await this.updateRtHash(user['_id'], tokens.refresh_token);

    return tokens;
  }

  login(dto: LoginDto) {}

  logOut() {}

  refreshTokens() {}

  async updateRtHash(userId: ObjectId, rt: string) {
    const hash = await this.hashData(rt);
    await this.usersRepository.findOneAndUpdate(userId, { hashedRt: hash });
  }

  hashData(data: string) {
    return bcrypt.hash(data, 10);
  }

  async getTokens(userId: ObjectId, email: string) {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: process.env.JWT_AUTH_SECRET,
          expiresIn: '50m',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: process.env.JWT_REFRESH_SECRET,
          expiresIn: '7d',
        },
      ),
    ]);

    return { access_token: at, refresh_token: rt };
  }
}
