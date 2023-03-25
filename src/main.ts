/* =======================================================
 *
 * Created by anele on 21/04/2023.
 *
 * @anele_ace
 *
 * =======================================================
 */

import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api/');
  const config = new DocumentBuilder()
    .setTitle('aceMedia')
    .setDescription('The aceMedia API description')
    .setVersion('1.0')
    //.addTag('books')
    .build();
  /*
   whitelist: removes all properties of a request’s body which are not in the DTO

   transform: this property would allow us to transform properties, for instance, an integer to a string.

  */
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
  //console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
