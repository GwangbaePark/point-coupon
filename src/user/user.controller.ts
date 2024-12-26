import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserService } from './user.service';
import { User } from './enitities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@ApiTags('회원')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'List of all users' })
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'email 로 사용자 조회' })
  @ApiResponse({ status: 200, description: 'User data' })
  @ApiResponse({ status: 404, description: 'User not found' })
  findOne(@Param('id') id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: '신규회원 생성' })
  @ApiResponse({
    status: 201,
    type: User,
    description: 'The created user',
  })
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: '회원정보 수정' })
  @ApiResponse({ status: 200, description: 'User successfully updated' })
  update(@Param('id') id: number, @Body() user: Partial<User>): Promise<User> {
    return this.userService.update(id, user);
  }

  @Delete(':id')
  @ApiOperation({ summary: '회원정보 삭제' })
  @ApiResponse({ status: 200, description: 'User successfully deleted' })
  remove(@Param('id') id: number): Promise<void> {
    return this.userService.remove(id);
  }
}
