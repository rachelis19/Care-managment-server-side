import { HttpException, HttpStatus } from '@nestjs/common'

export abstract class BaseException extends HttpException{
    constructor(message, status: HttpStatus){
        super(message, status)
    }
}