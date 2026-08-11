import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
@Injectable()
export class UserService {
  private users = [
    { id: 1, name: 'Gloria', email: 'gloria@gmail.com', role: 'ENGINEER' },
    { id: 2, name: 'Uwineza', email: 'uwineza@gmail.com', role: 'ADMIN' },
  ];
  findAll(role?: 'ENGINEER' | 'ADMIN') {
    if (role) {
      return this.users.filter((user) => user.role === role);
    }
    return this.users;
  }
  findOne(id: number) {
    return this.users.find((user) => user.id === id);
  }
  create(createUserDto: CreateUserDTO) {
    const userWithHighestId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = {
      id: userWithHighestId[0].id + 1,
      ...createUserDto,
    };
    this.users.push(newUser);
    return newUser;
  }
  update(id: number, updateUserDto: UpdateUserDTO) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException('there is no user with that id');
    }
    user.name = updateUserDto.name ?? user.name;
    user.email = updateUserDto.email ?? user.email;
    user.role = updateUserDto.role ?? user.role;
    return user;
  }
  delete(id: number) {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new NotFoundException('there is no user with that id');
    }
    this.users.splice(userIndex, 1);
    return { message: 'deleted user successfully' };
  }
}
