import { Global, HttpException, Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exception-filter/exception-filter.filter';
import { ResponseInterceptor } from './common/interceptor/response-interceptor.interceptor';
/**
 * bootsrap function
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    //logger: false
    //logger: ['log', 'error', 'warn']
  }
  );

  // app.enableVersioning({          //   versioning at url level
  //   type: VersioningType.URI,
  //   defaultVersion: ['1', '2', '3']
  // });


  // app.enableVersioning({     // versioning at header level
  //   type: VersioningType.HEADER,
  //   header: 'cnc-header-name',
  //   //defaultVersion: ['1', '2', '3']
  // });


  app.enableVersioning({          //   versioning at media type
    type: VersioningType.MEDIA_TYPE,
    key: 'cncv='

  });

  app.useGlobalInterceptors(new ResponseInterceptor());

  //app.useGlobalFilters(new HttpExceptionFilter())
  // app.useGlobalPipes(new ValidationPipe(
  //   {
  //     disableErrorMessages: true,
  //     whitelist: true,
  //     forbidNonWhitelisted: true

  //   }
  // ))
  /**
   * documentbulider for swagger
   */
  const config = new DocumentBuilder()
    .setTitle('Shop App')
    .setDescription('Shopping cart application')
    .setVersion('v1.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('apis', app, document);

  await app.listen(8080);
}
bootstrap();
