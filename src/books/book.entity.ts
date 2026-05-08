import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('books')
export class Book {
  @ApiProperty({ example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'The Great Gatsby' })
  @Column()
  title: string;

  @ApiProperty({ example: 'F. Scott Fitzgerald' })
  @Column()
  author: string;

  @ApiProperty({ example: '978-0-7432-7356-5' })
  @Column({ unique: true })
  isbn: string;

  @ApiProperty({ example: 'Fiction' })
  @Column()
  genre: string;

  @ApiProperty({ example: 3 })
  @Column({ default: 1 })
  totalQuantity: number;

  @ApiProperty({ example: 3 })
  @Column({ default: 1 })
  availableCopies: number;

  @ApiProperty({ example: '2025-01-01T00:00:00.000Z' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ example: '2025-01-01T00:00:00.000Z' })
  @UpdateDateColumn()
  updatedAt: Date;
}