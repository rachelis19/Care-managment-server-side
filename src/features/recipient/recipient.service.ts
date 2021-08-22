import { Recipient, RecipientDocument } from './recipient.schema'
import { Injectable, Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { RecipientDto } from './recipient.dto'
import { Model } from 'mongoose'



@Injectable()
export class RecipientService{
    logger = new Logger(RecipientService.name)

    constructor(@InjectModel(Recipient.name) private recipientModel: Model<RecipientDocument>) {}
    
    public async create(recipient: RecipientDto): Promise<Recipient> {
      this.logger.log('Received create recipient request')
          
      const createdRecipient = new this.recipientModel(recipient)

      return await createdRecipient.save()
    }

    public async find(recipientEmail: string): Promise<Recipient> {
      this.logger.log(`Received find recipient request with ${recipientEmail} email`)

      return await this.recipientModel.findOne({email: recipientEmail})
    }

    public async findAll(): Promise<Recipient[]>{
        this.logger.log('Received find all recipients request')

        return await this.recipientModel.find()
    }

    // public async update(){
    //     return await this.userModel.updateOne()
    // }
     
}