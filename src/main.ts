import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { useContainer } from 'class-validator'
import * as cookieParser from 'cookie-parser'
import { SystemLogger } from './modules/logger/logger.service'
import { ConfigService } from '@nestjs/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true
  })
  // wrap AppModule with UseContainer
  useContainer(app.select(AppModule), { fallbackOnErrors: true })

  // app use custom logger
  app.useLogger(app.get(SystemLogger))

  // app use global pipes to automatically validate requests
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      skipMissingProperties: true
    })
  )

  // app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // initialization cookie
  app.use(cookieParser())

  const configService = app.get(ConfigService)
  await app.listen(configService.get<number>('SERVER_PORT', 3000))
}
bootstrap()
