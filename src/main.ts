import {ValidationPipe} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Class-validation & class-transformation integration
  app.useGlobalPipes(new ValidationPipe());


  //swagger intigration
  const config = new DocumentBuilder()
  .setTitle('Cats example')
  .setDescription('The cats API description')
  .setVersion('1.0')
  .addTag('cats')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);


  // console.log(process.env.DATABASE_USER);
  // console.log(process.env.DATABASE_PASSWORD);
  // console.log(process.env.PATH);

  await app.listen(3000);
}
bootstrap();
