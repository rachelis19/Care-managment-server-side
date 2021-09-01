import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Logger } from '@nestjs/common'
import globals from 'globals'



async function bootstrap() {

  const app = await NestFactory.create(AppModule)

  const logger = new Logger('bootstrap')
  
  app.enableCors()
  
  globals(app)

  await app.listen(8082)
  
  logger.log('App context is ready')

}


bootstrap()
