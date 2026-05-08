import {
  IsString,
  IsNumber,
  IsOptional,
  IsNotEmpty,
  Min,
} from 'class-validator';

export class CreateBookDto {
  @ApiProperty({
    description: 'Title of the book',
    example: 'The Great Gatsby',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Author of the book',
    example: 'F. Scott Fitzgerald',
  })
  @IsString()
  @IsNotEmpty()
  author: string;

  @ApiProperty({
    description: 'ISBN — must be unique across all books',
    example: '978-0-7432-7356-5',
  })
  @IsString()
  @IsNotEmpty()
  isbn: string;

  @ApiProperty({
    description: 'Genre or category of the book',
    example: 'Fiction',
  })
  @IsString()
  @IsOptional()
  genre: string;

  @ApiProperty({
    description: 'Total number of copies the library owns',
    example: 3,
    minimum: 1,
  })
  @IsNumber()
  @IsPositive()
  @Min(1)
  totalQuantity: number;

  @IsNumber()
  @IsOptional()
  availableCopies?: number;
}
