import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'John Doe', description: 'The name of the user' })
  @Column()
  name: string;

  @ApiProperty({ example: 'john@aaa.com', description: 'The name of the user' })
  @Column()
  email: string;

  @ApiProperty({ example: 25, description: 'The age of the user' })
  @Column()
  age: number;
}
