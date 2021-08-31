import { Injectable, Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { UserType } from 'src/core/config/enums'
import { ValidationException } from 'src/core/exceptions/validation-exception'
import { RecipientService } from '../recipient/recipient.service'
import { UserService } from '../user/user.service'
import { DistributionDto } from './distribution.dto'
import { Distribution, DistributionDocument } from './distribution.schema'


@Injectable()
export class DistributionService{
    
    logger = new Logger(DistributionService.name)

    constructor(@InjectModel(Distribution.name)
     private distributionModel: Model<DistributionDocument>, 
     private recipientService: RecipientService,
     private userService: UserService){}

    public async create(distribution: DistributionDto): Promise<Distribution>{
      this.logger.log('Received create distribution request with')
      
      await this.validateEmail(distribution.adminEmail, true)
      await this.validateEmail(distribution.volunteerEmail, true)
     
                                                
      const createdDistribution = new this.distributionModel(distribution)
      
      this.logger.log(`Creating distribution with ${createdDistribution._id} id`)

      return await createdDistribution.save()
    }

    public async findAll(): Promise<Distribution[]>{
       this.logger.log('Received find all distributions request') 

       return await this.distributionModel.find()
    }

    public async find(id: string): Promise<Distribution>{
       this.logger.log(`Received find distribution request with ${id}`) 

        return await this.distributionModel.findOne({_id: id})
    }

    public async update(id: string, distribution: Distribution){
      this.logger.log(`Received update distribution request with ${id} id`) 

      return await this.distributionModel.findByIdAndUpdate(id, distribution)

    }

    protected async validateEmail(email: string, isUser: boolean = false){
     const response = isUser? await this.userService.find(email): 
                              await this.recipientService.find(email)
      
      if(!response){

        const message = `There is no such ${email} email in the system`
        throw new ValidationException(message)
      }
    }
}