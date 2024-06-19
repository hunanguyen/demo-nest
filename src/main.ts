import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { TransformInterceptor } from './business/interceptors/response.interceptor';
import { BusinessModule } from './business/business.module';
declare const module: any;


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  await app.listen(configService.get<string>('APP_PORT'));
  app.useGlobalInterceptors(new TransformInterceptor(new Reflector()));
}
bootstrap();
