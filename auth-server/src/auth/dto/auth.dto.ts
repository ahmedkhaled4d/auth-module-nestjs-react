import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class AuthDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
