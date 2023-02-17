import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @MinLength(5)
  @MaxLength(30)
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(30)
  password: string;
}
