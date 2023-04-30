import { CacheModule, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module'
import { LoggerMiddleware } from './common/middleware/logger-middleware.middleware';
import { ProductsModule } from './products/products.module';
import { UserModule } from './user/user.module';
import { ScheduleModule } from '@nestjs/schedule';
// import { HttpModule, HttpService } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forRoot({

    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '1234',
    database: 'postgres',
    entities: ["dist/**/*.entity{.ts,.js}"],
    synchronize: true,
    schema: 'public'
  }),
    CategoriesModule, ProductsModule, UserModule,
  //  CacheModule.register({
  //     ttl: 30
  //   }),
  EventEmitterModule.forRoot(),
  ScheduleModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

}
