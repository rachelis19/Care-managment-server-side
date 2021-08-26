import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Logger, ValidationError, ValidationPipe } from '@nestjs/common'
import { HttpExceptionFilter } from './core/httpFilters/http-exception.filter'
import { ValidationException } from './core/exceptions/validation-exception'
import { JwtAuthGuard } from './features/auth/guards/jwt.guard'
import { AuthGuard } from '@nestjs/passport'

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

  logger.log('App context is ready')

}


bootstrap()
