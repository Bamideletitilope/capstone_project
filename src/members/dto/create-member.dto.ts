import { IsString, IsEmail, IsOptional, IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMemberDto {
  @ApiProperty({
    description: 'Full name of the member',
    example: 'Jane Smith',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Unique email address of the member',
    example: 'jane@example.com',
  })
  @IsEmail()
  email: string;

  @ApiPropertyOptional({     // use ApiPropertyOptional for optional fields
    description: 'Contact phone number',
    example: '+2348012345678',
  })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiPropertyOptional({
    description: 'Membership tier',
    enum: ['basic', 'premium'],
    example: 'basic',
    default: 'basic',
  })
  @IsEnum(['basic', 'premium'])
  @IsOptional()
  membershipType?: 'basic' | 'premium';
}