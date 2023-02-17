import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
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
    const usernameTaken = await this.usersRepository.findOne({
      email: dto.email,
    });

    if (usernameTaken)
      throw new HttpException(
        'Username is already taken! Please provide another one.',
        HttpStatus.BAD_REQUEST,
      );

    const hash = await this.hashData(dto.password);

    const user = await this.usersRepository.create({ email: dto.email, hash });
    const tokens = await this.getTokens(user['_id'], user.email);
    await this.updateRtHash(user['_id'], tokens.refresh_token);

    return tokens;
  }

  async login(dto: LoginDto): Promise<Tokens> {
    const user = await this.usersRepository.findOne({ email: dto.email });

    if (!user)
      throw new ForbiddenException(
        `Can't find user with email: ${dto.email} }`,
      );

    const passwordMatches = await bcrypt.compare(dto.password, user.hash);
    if (!passwordMatches)
      throw new ForbiddenException(`Wrong username/password! `);

    const tokens = await this.getTokens(user['_id'], user.email);
    await this.updateRtHash(user['_id'], tokens.refresh_token);
    return tokens;
  }

  async logOut(userId: ObjectId) {
    await this.usersRepository.findOneAndUpdate(
      {
        _id: userId,
        // checks if Refresh token is already null
        // no need to update if it is already null
        hashedRt: { $ne: null },
      },
      { hashedRt: null },
    );
  }

  async refreshTokens(userId: ObjectId, rt: string) {
    const user = await this.usersRepository.findOne({ _id: userId });
    // if logged out hashedRt will be null
    // have to check for hashedRt or program can break on bcrypt compare
    if (!user || !user.hashedRt) throw new ForbiddenException('User not found!');

    const rtMatches = await bcrypt.compare(rt, user.hashedRt);
    if (!rtMatches) throw new ForbiddenException('Refresh token not valid!');

    const tokens = await this.getTokens(user['_id'], user.email);
    await this.updateRtHash(user['_id'], tokens.refresh_token);
    return tokens;
  }

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
          expiresIn: '10m',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: process.env.JWT_REFRESH_SECRET,
          expiresIn: '1d',
        },
      ),
    ]);

    return { access_token: at, refresh_token: rt };
  }
}
