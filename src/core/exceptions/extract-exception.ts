import { BaseException } from './base-exception'

export class ExtractException{
    public static fromException(exception){

        if(exception == typeof(BaseException)){
             return BaseException
        }

        return exception
    }
}