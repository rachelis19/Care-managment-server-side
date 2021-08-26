import { ValidationError, ValidationPipe } from "@nestjs/common"
import { ValidationException } from "src/core/exceptions/validation-exception"
import { HttpExceptionFilter } from "src/core/httpFilters/http-exception.filter"

export default(app) =>{
    app.useGlobalFilters(new HttpExceptionFilter())

    app.useGlobalPipes(new ValidationPipe({
      exceptionFactory: (validationError: ValidationError[] = [])=>{  
        const messages = []
      
        validationError.forEach(error=> {messages.push(error.constraints)})
        
        return new ValidationException(messages)
      }
    }))
}
