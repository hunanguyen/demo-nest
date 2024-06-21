import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { TransformInterceptor } from './business/interceptors/response.interceptor';
import { BusinessModule } from './business/business.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
declare const module: any;


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const config = new DocumentBuilder()
    .setTitle('BUSINESS')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(configService.get<string>('APP_PORT'));
  app.useGlobalInterceptors(new TransformInterceptor(new Reflector()));
}
bootstrap();
