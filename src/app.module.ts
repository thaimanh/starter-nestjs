import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { AuthModule } from './modules/auth/auth.module'
import { UsersModule } from './modules/users/users.module'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { RolesGuard } from './modules/auth/guard/roles.guard'
import { JWTGuard } from './modules/auth/guard'
import { MailModule } from './modules/mail/mail.module'
import { LoggerModule } from './modules/logger/logger.module'
import { MongooseModule } from '@nestjs/mongoose'
import { HealthModule } from './modules/health/health.module';
import LoggerMiddleware from './middleware/log.middleware'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: process.env.NODE_ENV === 'development' ? '.env.dev' : '.env' }),
    AuthModule,
    UsersModule,
    LoggerModule,
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        const dbUser = configService.get<string>('DB_USERNAME')
        const dbPass = configService.get<string>('DB_PASSWORD')
        const dbName = configService.get<string>('DB_NAME')
        const dbHost = configService.get<string>('DB_HOST')
        const dbPort = configService.get<string>('DB_PORT')
        return {
          uri: `mongodb://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}`,
          authSource: 'admin'
        }
      },
      inject: [ConfigService]
    }),
    MailModule,
    LoggerModule,
    HealthModule
  ],
  controllers: [],
  providers: [
    { provide: APP_GUARD, useClass: JWTGuard },
    { provide: APP_GUARD, useClass: RolesGuard }
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('/')
  }
}
//mongodb://USERNAME:PASSWORD@HOST:PORT/DATABASE
