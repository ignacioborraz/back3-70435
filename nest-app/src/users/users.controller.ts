/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() data: User) {
    try {
      return await this.usersService.create(data);
    } catch (error: any) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get()
  async findAll() {
    try {
      const users = await this.usersService.findAll();
      if (users.length === 0) {
        throw new HttpException('Not Found', 404);
      }
      return users;
    } catch (error: any) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    try {
      const user = await this.usersService.findById(id);
      if (!user) {
        throw new HttpException('Not Found', 404);
      }
      return user;
    } catch (error: any) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Patch(':id')
  async updateById(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      const user = await this.usersService.updateById(id, updateUserDto);
      if (!user) {
        throw new HttpException('Not Found', 404);
      }
      return user;
    } catch (error: any) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Delete(':id')
  async removeById(@Param('id') id: string) {
    try {
      const user = await this.usersService.removeById(id);
      if (!user) {
        throw new HttpException('Not Found', 404);
      }
      return user;
    } catch (error: any) {
      throw new HttpException(error.message, error.status);
    }
  }
}
