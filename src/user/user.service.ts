import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
const bcrypt =require('bcrypt');

@Injectable()
export class UserService {
  
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }
  findOne(email: string): Promise<User> {
    return this.usersRepository.findOne({where: {email: email}});
  }
 
  findBy(data:Object): Promise<User[]> {
    return this.usersRepository.find(data)
  }
  create(User:User): Promise<User> {
       return this.usersRepository.save(User)
  }
  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
  async register(users:CreateUserDto): Promise<any>{
    users.password= await bcrypt.hash(users.password, 12) 
    try{
      const{ password,...result}= await this.usersRepository.save(users);
      return result;
    }
    catch{
      return {status:"False",message:"Could not register"}
    }
  }
}