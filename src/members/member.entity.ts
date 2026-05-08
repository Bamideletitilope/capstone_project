import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('members')
export class Member {
  @ApiProperty({ example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Jane Smith' })
  @Column()
  name: string;

  @ApiProperty({ example: 'jane@example.com' })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ example: '+2348012345678', required: false })
  @Column({ nullable: true })
  phone: string;

  @ApiProperty({ enum: ['basic', 'premium'], example: 'basic' })
  @Column({ type: 'enum', enum: ['basic', 'premium'], default: 'basic' })
  membershipType: 'basic' | 'premium';

  @ApiProperty({ example: true })
  @Column({ default: true })
  isActive: boolean;

  @ApiProperty({ example: '2025-01-01T00:00:00.000Z' })
  @CreateDateColumn()
  joinDate: Date;

  @ApiProperty({ example: '2025-01-01T00:00:00.000Z' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ example: '2025-01-01T00:00:00.000Z' })
  @UpdateDateColumn()
  updatedAt: Date;
}
