import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @IsDefined()
  @IsString()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsDefined()
  @IsString()
  @ApiProperty()
  password: string;
}
