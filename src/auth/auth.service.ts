import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {InjectModel} from '@nestjs/mongoose';
import {hash} from 'bcrypt';
import {Model} from 'mongoose';
import {UserDTO} from 'src/user/dto/user.dto';
import {Users, UsersDocument} from 'src/user/schema/user.schema';
import { UserService } from 'src/user/user.service';
import {RegisterAuthDto} from './dto/register-auth.dto';

@Injectable()
export class AuthService {
  
  constructor(
    @InjectModel(Users.name)
    private readonly userModel: Model<UsersDocument>,
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}
  
  async registerUser(registryObject: RegisterAuthDto){
    const { password } = registryObject; 
    const hashPassword = await hash(password, 10);
    registryObject = { 
      ...registryObject, 
      password: hashPassword
    }
    return this.userModel.create(registryObject);
  }

  async signIn(user: any) {
    const payload = {
      userMail: user.email,
      sub: user._id,
    };
    console.log('debug payload', payload);
    return {
      access_token: this.jwtService.sign(payload),
    }
  }

  async signUp(userDto: UserDTO) {
    return this.userService.createUser(userDto);
  }
}
