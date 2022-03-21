import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({origin:"*"});

  const config = new DocumentBuilder()
    .setTitle('Vending Machine Admin API docs')
    .setDescription('Vending Machine Admin API description')
    .setVersion('1.0')
    // .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  const port = 8300;
  console.log('Customer backend port ' , 'http://localhost:'+port+'/api/')
  SwaggerModule.setup('api', app, document);
  await app.listen(port);
}
bootstrap();
