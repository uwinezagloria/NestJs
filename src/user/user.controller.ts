import { Controller, Get, Query, Param, Post, Put, Body } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  private users = [
    { id: 1, name: 'Gloria' },
    { id: 2, name: 'Uwineza' },
  ];
  @Get()
  // query parameter
  getUsers(@Query('name') name: string) {
    if (name) {
      return this.users.filter(
        (user) => user.name.toLowerCase() === name.toLowerCase(),
      );
    }
    return this.users;
  }
  // get user by id
  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.users.find((user) => user.id === Number(id));
  }
  @Post()
  createUser(@Body() createUserDTO: CreateUserDTO) {
    const lastUser = this.users[this.users.length - 1];
    const newId = lastUser.id + 1;
    const newUser = {
      id: newId,
      name: createUserDTO.name,
    };
    this.users.push(newUser);
    return { data: newUser, message: 'user created successfully' };
  }
  @Put(':id')
  updateUser(@Param('id') id: string, @Body() updateUserDTO: UpdateUserDTO) {
    const user = this.users.find((user) => user.id === Number(id));
    if (user) {
      user.name = updateUserDTO.name;
    }
    return { data: updateUserDTO };
  }
}
