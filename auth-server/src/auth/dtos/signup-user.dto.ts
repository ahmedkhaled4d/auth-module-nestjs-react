import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class SignUpUserDto {
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @IsString()
  @IsEmail()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
