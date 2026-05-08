import { IsEmail, IsString, MinLength, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    description: 'Full name of the user',
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Unique email address',
    example: 'john@library.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Password — minimum 8 characters',
    example: 'password123',
    minLength: 8,
  })
  @IsString()
  @MinLength(8)
  password: string;

  // role is accepted but intentionally ignored — always assigned 'member'
  @IsOptional()
  @IsString()
  role?: string;
}
