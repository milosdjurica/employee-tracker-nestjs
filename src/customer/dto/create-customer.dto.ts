import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  @MinLength(5)
  @MaxLength(30)
  name: string;

  @IsString()
  @MinLength(5)
  @MaxLength(30)
  industry: string;
}
