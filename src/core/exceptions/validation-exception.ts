import { HttpStatus } from '@nestjs/common'
import { BaseException } from './base-exception'

export class ValidationException extends BaseException{
   constructor(message){
       super(message, HttpStatus.BAD_REQUEST)
   } 
   
   public json(){
       return {
           errors: this.getResponse(),
           status: this.getStatus(),
           message: this.message,
           stack: this.stack,
       }
   }
}
