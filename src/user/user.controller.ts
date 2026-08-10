import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Put,
  Body,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  // query parameter
  findAll(@Query('role') role: 'ENGINEER' | ' ADMIN') {
    return this.userService.findAll(role);
  }
  // get user by id
  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.userService.findOne(Number(id));
  }
  @Post()
  createUser(@Body() user: { name: string; email: string; role: string }) {
    return this.userService.create(user);
  }
  @Put(':id')
  updateUser(
    @Param('id') id: string,
    @Body()
    updateUser: { name?: string; email?: string; role?: 'ENGINEER' | 'ADMIN' },
  ) {
    return this.userService.update(Number(id), updateUser);
  }
  @Delete(':id')
  delteUser(@Param('id') id: string) {
    return this.userService.delete(Number(id));
  }
}
