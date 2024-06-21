import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BusinessModule } from './business/business.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TransformInterceptor } from './business/interceptors/response.interceptor';
import { PrismaModule } from '../prisma/prisma.module';
@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          uri: configService.get<string>('MONGODB_URI'),
          autoCreate: true,
          autoIndex: true,
        };
      },
      inject: [ConfigService],
    }),
    ConfigModule.forRoot( {
      isGlobal: true,
    }),
    BusinessModule,
    PrismaModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor
    }
  ],
})
export class AppModule {}
