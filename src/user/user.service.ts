import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { GoogleUserDto } from './dto/google-user.dto';
const bcrypt =require('bcrypt');
import {google} from 'googleapis'
import { JwtService } from '@nestjs/jwt';
const {OAuth2}= google.auth
const client = new OAuth2(process.env.GOOGLE_ID)
@Injectable()
export class UserService {
  
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }
  async findOne(email: string): Promise<User> {
    return await this.usersRepository.findOne({where: {email: email}});
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

  async logingoogle(createUserDto: GoogleUserDto) {
    const user=await this.usersRepository.findOne({where: {email: createUserDto.email}})
    if (user){
      return await this.payload(user)
    }
    else{
      try{
        const res = await client.verifyIdToken({idToken:createUserDto.idToken})
        const newUser= new User();
        newUser.firstName=res.getPayload().given_name;
        newUser.lastName=res.getPayload().family_name;
        newUser.email=res.getPayload().email;
        newUser.avatarUrl=res.getPayload().picture;
        newUser.isActive=true
        const data= this.usersRepository.save(newUser)
        if(data){
          return await this.payload(data)
        }
        else{
          throw new BadRequestException({"message":"Server Error!"})
        }
      }
      catch (err) {
        console.log(err)
      }
    }
 }
 async payload(user: any) {
  const payload = {
    id: user.id,
    email: user.email,
    avatarUrl: user.avatarUrl,
    firstName: user.firstName,
    lastName: user.lastName,
    isActive: user.isActive,
    roles: user.roles,
    money: user.money,
  };
  return {
    access_token: this.jwtService.sign(payload),
    user:payload
  };
}
}