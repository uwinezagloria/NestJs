import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Put,
  Body,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  // query parameter
  findAll(@Query('role') role?: 'ENGINEER' | 'ADMIN') {
    return this.userService.findAll(role);
  }
  // get user by id
  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }
  @Post()
  createUser(@Body() createUserDto: CreateUserDTO) {
    return this.userService.create(createUserDto);
  }
  @Put(':id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    updateUserDto: UpdateUserDTO,
  ) {
    return this.userService.update(id, updateUserDto);
  }
  @Delete(':id')
  delteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.delete(id);
  }
}
