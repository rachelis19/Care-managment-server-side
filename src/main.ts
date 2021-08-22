import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Logger, ValidationError, ValidationPipe } from '@nestjs/common'
import { HttpExceptionFilter } from './core/httpFilters/http-exception.filter'
import { ValidationException } from './core/exceptions/validation-exception'

async function bootstrap() {

  const app = await NestFactory.create(AppModule)

  const logger = new Logger('bootstrap')

  app.useGlobalFilters(new HttpExceptionFilter())

  app.useGlobalPipes(new ValidationPipe({
    exceptionFactory: (validationError: ValidationError[] = [])=>{  
      const messages = []
    
      validationError.forEach(error=> {messages.push(error.constraints)})
      
      return new ValidationException(messages)
    }
  }))
  
  await app.listen(3000)

  logger.log('app context is ready')

}


bootstrap()
