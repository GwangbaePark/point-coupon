import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PointService } from './point.service';
import { CreatePointDto } from './dto/create-point.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('포인트')
@Controller('points')
export class PointController {
  constructor(private readonly pointService: PointService) {}

  @ApiOperation({ summary: '사용자별 포인트 적립' })
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async create(@Body() createPointDto: CreatePointDto) {
    return await this.pointService.create(createPointDto);
  }

  @ApiOperation({ summary: '특정 사용자별 포인트 조회' })
  @Get('user/:userId')
  async findAllByUser(@Param('userId') userId: number) {
    return await this.pointService.findAllByUser(userId);
  }
}
