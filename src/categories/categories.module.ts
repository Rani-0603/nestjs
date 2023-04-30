import { CacheModule, Inject, MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { CategoriesController } from './categories.controller';
import { CategoriesService } from "./categories.service";
import { HttpModule, HttpService } from '@nestjs/axios';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "./category.entity";
import { Products } from "../products/products.entity";
import { CategoryRepository } from "./category.repository";
//import { MailModule } from "src/common/mail/mail.module";
import { LoggerMiddleware } from "../common/middleware/logger-middleware.middleware";
import { MailModule } from "../mail/mail.module";

/**
 * category module class
 */
@Module({
    controllers: [CategoriesController],
    providers: [{
        provide: CategoriesService,
        useClass: CategoriesService
    }, {
        provide: 'GREET',
        useValue: 'HELLO HOW ARE YOY?'
    }, {
        provide: 'NUMBER_LIST',
        useFactory: () => {
            let arr = [];
            for (let i = 1; i <= 10; i++) {
                arr.push(i)
            }
            return arr;
        },

    },
        // {

        //     provide: 'USER_LIST',

        //     useFactory: async (http: HttpService) => {

        //         let res = await http.get('http://localhost:3000/posts').toPromise();

        //         console.log(res)

        //         return res.data;

        //     },

        //     inject: [HttpService]

        // }
        CategoryRepository
    ],
    //imports: [HttpModule, TypeOrmModule.forFeature([Category, Products]), MailModule], //--mail servcice
    imports: [HttpModule, TypeOrmModule.forFeature([Category, Products]),  // to use lazy loading module

        CacheModule.register({
            ttl: 30
        })
    ],
    exports: [],
})

export class CategoriesModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware)
            .exclude(
                { path: '/categories/all/products', method: RequestMethod.GET }
            )

            .forRoutes(CategoriesController)

    }




    // configure(consumer: MiddlewareConsumer) {
    //     //consumer.apply(LoggerMiddleware).forRoutes(CategoriesController)
    //     consumer.apply(LoggerMiddleware).forRoutes(
    //         { path: '/categories', method: RequestMethod.GET },
    //         { path: '/categories/all/products', method: RequestMethod.GET },
    //         { path: '/categories/:id', method: RequestMethod.DELETE }
    //     )
    // }

}