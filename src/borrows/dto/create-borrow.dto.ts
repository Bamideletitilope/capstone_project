import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBorrowDto {
  @ApiProperty({
    description: 'UUID of the member borrowing the book',
    example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  })
  @IsUUID()
  memberId: string;

  @ApiProperty({
    description: 'UUID of the book being borrowed',
    example: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
  })
  @IsUUID()
  bookId: string;
}