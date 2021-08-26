import { User, UserDocument } from './user.schema'
import { Injectable, Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { UserDto } from './user.dto'
import { Model } from 'mongoose'
import { UserType } from 'src/core/config/enums'
import * as  bcrypt from 'bcrypt'

@Injectable()
export class UserService{
    logger = new Logger(UserService.name)

    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
    
    public async create(user: UserDto): Promise<User> {
      this.logger.log('Received create user request')
    
      const createdUser = new this.userModel(user)
    
      const saltOrRounds = 10
      const hashedPassword = await bcrypt.hash(createdUser.password, saltOrRounds)   
      createdUser.password = hashedPassword

      return await createdUser.save()
      
    }

    public async find(userEmail: string): Promise<User> {
      this.logger.log(`Received find request with ${userEmail} email`)

      return await this.userModel.findOne({email: userEmail})
    }

    public async findAll(options): Promise<User[]>{
        this.logger.log('Received find all users request')

        return await this.userModel.find(options)
    }

    public async numOfUsers(type :UserType){
      return (await this.findAll({userType: type})).length
    }

    // public async update(){
    //     return await this.userModel.updateOne()
    // }
     
}