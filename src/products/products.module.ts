import { CacheModule, Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { Products } from './products.entity';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductsService } from "./products.service";
import { HttpModule } from '@nestjs/axios';

/**
 * Product Module class
 */
@Module({
    controllers: [ProductsController],
    providers: [
        {
            provide: ProductsService,
            useClass: ProductsService,
        },
    ],


    imports: [HttpModule, TypeOrmModule.forFeature([Products]),
        CacheModule.register({
            ttl: 20
        })
    ],
    exports: [],
})
export class ProductsModule {

}
