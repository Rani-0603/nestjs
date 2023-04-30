import { CACHE_MANAGER, ConflictException, HttpException, HttpStatus, Inject, Injectable, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Between, Repository } from "typeorm";
import { Cache } from "cache-manager";
import { Products } from "./products.entity";
import { ProductsDTO } from "./dto/products.dto";
import { OnEvent } from "@nestjs/event-emitter";


/**
 * Product service fetch the data from database
 */
@Injectable()
export class ProductsService {
    logger = new Logger(ProductsService.name)
    /**
     * Constructor class
     */
    constructor(@InjectRepository(Products) private productRepo: Repository<Products>,
        @Inject(CACHE_MANAGER) private cacheManager: Cache
    ) { }

    /**
     * Fetch product from DB 
     * @returns List of product
     */
    async fetchAllProducts(): Promise<ProductsDTO[]> {
        // return await this.productRepo.find();
        //let res = await this.productRepo.find({ relations: ['category'] });

        console.log('caching in service')
        let cachedData: ProductsDTO[] = await this.cacheManager.get('product-list');
        console.log(cachedData)
        if (cachedData) {
            return cachedData;
        } else {
            let res = await this.productRepo.find({ select: ['id', 'productName', 'price', 'quantity', 'description'] });
            if (res.length === 0) {
                const products_not_found = 'No data found';
                this.logger.error(products_not_found)
                throw new NotFoundException({
                    status: HttpStatus.NOT_FOUND,
                    error: products_not_found
                });
            } else {
                await this.cacheManager.set('product-list', res);
                this.logger.log('Product fetched Successfully')
            }
            return res;
        }
    }

    /**
    * Get product from DB by Id
    * @param id 
    * @returns List of product by id
    */
    async getByProductId(id: number): Promise<ProductsDTO> {
        //return await this.productRepo.findOneBy({ id: id });
        console.log(id)
        let res = await this.productRepo.findOneBy({ id: id });
        if (!res) {
            throw new HttpException('Product not found for given Id', HttpStatus.NOT_FOUND)
        }
        //console.log(res)
        return res;
    }

    /**
     * Get the product by name
     * @param name 
     * @returns product product which is search
     */
    async getProductName(name: string): Promise<ProductsDTO> {
        const res = await this.productRepo.findOneBy({ productName: name });
        if (!res) {
            throw new HttpException(
                'Product not found for given name',
                HttpStatus.NOT_FOUND
            );
        }
        return res;
    }

    /**
     * Create new product
     * @returns Newly created product
     */
    async addProducts(productsDTO: ProductsDTO): Promise<ProductsDTO> {
        //return await this.productRepo.save(productsDTO);
        try {
            let res = await this.productRepo.save(productsDTO);
            return res;
        } catch (error) {
            console.log(error)
            if (error.code === '23505') {
                throw new ConflictException({
                    status: HttpStatus.CONFLICT,
                    message: 'Product already exist'
                })
            } else if (error.code === '23502') {
                throw new InternalServerErrorException('Product Name should not be null');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    /**
     * Update product 
     * @returns  Updated product
     */
    updateProducts(productsDTO: ProductsDTO, id: number): ProductsDTO {
        return productsDTO;

    }

    /**
     * Delete product By id
     * @param id 
     * @returns Deleted record
     */
    async deleteProduct(id: number) {
        return await this.productRepo.delete({ id: id });
    }

    @OnEvent('user-loggedin-event')
    notifyLog(data) {
        console.log("product service", data)
        this.logger.warn(`${data.fullname} has loggedin @${new Date()}`)
    }

}