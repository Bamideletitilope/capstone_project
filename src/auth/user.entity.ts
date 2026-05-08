import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  BeforeInsert,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';

@Entity('users')
export class User {
  @ApiProperty({ example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'john@library.com' })
  @Column({ unique: true })
  email: string;

  // No @ApiProperty here — password must never appear in Swagger responses
  @Column({ select: false })
  password: string;

  @ApiProperty({ example: 'John Doe' })
  @Column()
  name: string;

  @ApiProperty({ enum: ['admin', 'librarian', 'member'], example: 'member' })
  @Column({ type: 'enum', enum: ['admin', 'librarian', 'member'], default: 'member' })
  role: 'admin' | 'librarian' | 'member';

  @ApiProperty({ example: '2025-01-01T00:00:00.000Z' })
  @CreateDateColumn()
  createdAt: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}