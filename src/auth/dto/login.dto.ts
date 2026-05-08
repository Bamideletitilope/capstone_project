import { IsEmail, IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: 'Registered email address',
    example: 'john@library.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Account password',
    example: 'password123',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
