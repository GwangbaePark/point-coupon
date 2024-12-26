import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'John Doe', description: '회원 이름' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'john@example.com',
    description: '회원 이메일',
  })
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 25, description: '회원 성별' })
  @IsEnum(['M', 'F'])
  gender: string;
}
