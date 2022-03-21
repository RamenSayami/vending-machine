import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CustomerModule } from './customer.module';

async function bootstrap() {
  const app = await NestFactory.create(CustomerModule);
  app.enableCors({origin:"*"});

  const config = new DocumentBuilder()
    .setTitle('Customer Module API docs')
    .setDescription('Customer Module API description')
    .setVersion('1.0')
    // .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  const port = 8200;
  console.log('Customer backend port ' , 'http://localhost:'+port+'/api/')
  await app.listen(port);
}
bootstrap();
