import {
  Controller, Get, Post, Patch,
  Delete, Body, Param, ParseUUIDPipe,
} from '@nestjs/common';
import {
  ApiTags, ApiOperation, ApiResponse,
  ApiBearerAuth, ApiParam,
} from '@nestjs/swagger';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './book.entity';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('books')
@ApiBearerAuth('JWT-auth')    // every route in this controller requires a token
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  @ApiOperation({ summary: 'Get all books in the library' })
  @ApiResponse({ status: 200, description: 'List of all books', type: [Book] })
  @ApiResponse({ status: 401, description: 'Not authenticated' })
  findAll() {
    return this.booksService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single book by ID' })
  @ApiParam({ name: 'id', description: 'UUID of the book' })
  @ApiResponse({ status: 200, description: 'The book record', type: Book })
  @ApiResponse({ status: 404, description: 'Book not found' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.booksService.findOne(id);
  }

  @Post()
  @Roles('admin', 'librarian')
  @ApiOperation({ summary: 'Add a new book — admin and librarian only' })
  @ApiResponse({ status: 201, description: 'Book created successfully', type: Book })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 403, description: 'Insufficient permissions' })
  @ApiResponse({ status: 409, description: 'ISBN already exists' })
  create(@Body() dto: CreateBookDto) {
    return this.booksService.create(dto);
  }

  @Patch(':id')
  @Roles('admin', 'librarian')
  @ApiOperation({ summary: 'Update a book — admin and librarian only' })
  @ApiParam({ name: 'id', description: 'UUID of the book to update' })
  @ApiResponse({ status: 200, description: 'Book updated successfully', type: Book })
  @ApiResponse({ status: 404, description: 'Book not found' })
  @ApiResponse({ status: 403, description: 'Insufficient permissions' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateBookDto,
  ) {
    return this.booksService.update(id, dto);
  }

  @Delete(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Delete a book — admin only' })
  @ApiParam({ name: 'id', description: 'UUID of the book to delete' })
  @ApiResponse({ status: 200, description: 'Book deleted successfully' })
  @ApiResponse({ status: 404, description: 'Book not found' })
  @ApiResponse({ status: 403, description: 'Insufficient permissions' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.booksService.remove(id);
  }
}