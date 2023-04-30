import { CACHE_MANAGER, ConflictException, HttpException, HttpStatus, Inject, Injectable, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { NotNullException } from "../common/not-null.exception";
import { Products } from "../products/products.entity";
import { Cache } from "cache-manager";
import { Between, Repository } from "typeorm";
//import { Category } from "./category.entity";
import { CategoriesDTO } from "./dto/categories.dto";
import { CategoryRepository } from "./category.repository";
import { LazyModuleLoader } from "@nestjs/core";
//import { MailService } from "../mail/mail.service";
import { ProductsDTO } from "../products/dto/products.dto";
import { ProductRepository } from "src/products/products.repository";
//import { MailModule } from "src/common/mail/mail.module";

/**
 * Category service fetch the data from database
 */
@Injectable()
export class CategoriesService {
    // findCategoriesByName(categoryName: string) {
    //     throw new Error("Method not implemented.");
    // }
    logger = new Logger(CategoriesService.name)
    //private categoriesDTO = []
    constructor(
        //@InjectRepository(Category) private categoryRepo: Repository<Category>,
        private categoryRepo: CategoryRepository,
        @InjectRepository(Products) private productRepo: Repository<Products>,
        //private productRepo: ProductRepository,
        //private mailService: MailService,
        private lazyModuleLoader: LazyModuleLoader,
        @Inject(CACHE_MANAGER) private cacheManager: Cache
    ) { }

    /**
     * Fetch Category from DB 
     * @returns List of category
     */
    async fetchAllCategories(): Promise<CategoriesDTO[]> {
        // let res = await this.categoryRepo.find();

        // let res = await this.categoryRepo.find({select:['id', 'categoryName', 'addedBy'], order: {categoryName: 'ASC'},where: {products: {price: Between(1, 123)}}});
        // let res = await this.categoryRepo.query("select id, categoryName from categories where categoryName != '' ")

        // if (res.length === 0) throw new HttpException('No Data Found', HttpStatus.NOT_FOUND)
        // return res;
        //let res = await this.categoryRepo.getCategoryDetail();

         // default response

        // if (res.length === 0) {
        //     throw new HttpException({
        //         status: HttpStatus.NOT_FOUND,
        //         error: 'No data found'
        //     }, HttpStatus.NOT_FOUND)
        // }
        // return res;


        console.log('caching in service')
        let cachedData: CategoriesDTO[] = await this.cacheManager.get('category-list');
        console.log(cachedData)
        if (cachedData) {
            return cachedData;
        } else {

            let res = await this.categoryRepo.find({ select: ['id', 'categoryName', 'isActive'], order: { categoryName: 'ASC' } });
            let { MailModule } = await import("../mail/mail.module");
            let MailModuleRef = await this.lazyModuleLoader.load(() => MailModule);
            //console.log(MailModuleRef);

            let { MailService } = await import("../mail/mail.service");
            let MailServiceRef = await MailModuleRef.get(MailService);
            //console.log("--------------");
            //console.log(MailServiceRef);

            if (res.length === 0) {
                const categories_not_found = 'No data found';
                //this.mailService.getMessage(categories_not_found);
                MailServiceRef.getMessage(categories_not_found);

                this.logger.error(categories_not_found)
                throw new NotFoundException({
                    status: HttpStatus.NOT_FOUND,
                    error: categories_not_found
                });
            } else {
                await this.cacheManager.set('category-list', res);
                //this.mailService.sendMail('rani@hcl.com', 'anupama@hcl.com', 'testing', 'testing body')
                MailServiceRef.sendMail('rani@hcl.com', 'anupama@hcl.com', 'testing', 'testing body');
                this.logger.log(`Categories fetched successfully`)
            }
            return res;
        }

    }

    /**
     * Add new category
     * @returns List of new added category
     */
    async addCategory(categoriesDTO: CategoriesDTO): Promise<CategoriesDTO> {
        // return await this.categoryRepo.save(categoriesDTO);
        try {
            let res = await this.categoryRepo.save(categoriesDTO);
            //await this.cacheManager.del('category-list');
            return res;
        } catch (error) {
            console.log(error)
            this.logger.warn(error.message)
            if (error.code === '23505') {
                this.logger.warn(error.message)
                throw new ConflictException({
                    status: HttpStatus.CONFLICT,
                    message: 'Category already exist'
                })
            } else if (error.code === '23502') {
                this.logger.warn(error.message)
                throw new NotNullException('Category Name should not be null');
            } else {
                this.logger.error(error.message)
                throw new InternalServerErrorException();
            }
        }
    }

    /**
     * Get category from DB by Id
     * @param id 
     * @returns List of category by id
     */
    async getByCategoryId(id: number): Promise<CategoriesDTO> {
        console.log(id)
        let res = await this.categoryRepo.findOneBy({ id: id });
        if (!res) {
            const CATEEGORY_NOT_FOUND = 'Category not found for given Id'
            this.logger.warn(CATEEGORY_NOT_FOUND)
            throw new HttpException(CATEEGORY_NOT_FOUND, HttpStatus.NOT_FOUND)

        }
        console.log(res)
        return res;

    }
    /**
     * Update category by Id
     * @returns List of updated category
     */
    updateCategory(categoriesDTO: CategoriesDTO, id: number): CategoriesDTO {
        return categoriesDTO;

    }

    /**
     * Delete Category
     * @param id 
     * @returns Return affected rows
     */
    async deleteCategory(id: number) {
        return await this.categoryRepo.delete({ id: id });
        // let res = await this.categoryRepo.delete({ id: id });
        // if(res.affected > 0){
        //     await this.cacheManager.reset();
        // }
    }


    /**
     * Get all the categories along with the products
     * @returns List of category with product
     */


    async getCategoryWithProducts() {
        //,where: {products: {price: Between(1, 123)}}}
        let res = await this.categoryRepo.find({ select: ['id', 'categoryName', 'isActive'], relations: [`products`] });//left join
        if (res.length > 0) {
            this.logger.log('Category fetched successfully')
            return res;
        } else {
            this.logger.error('Not found')
            throw new NotFoundException()
        }
    }

    /**
     * Add new Category with product
     * @param categoriesDTO 
     * @returns New added category with product list
     */
    async addCategoryWithProducts(categoriesDTO: CategoriesDTO) {
        //await this.productRepo.save(categoriesDTO.products);
        let productsRes = await this.productRepo.save(categoriesDTO.products)
        let res = await this.categoryRepo.save({ ...categoriesDTO, products: productsRes });
        return res;
    }

    /**
     * Search category by name
     * @param categoryName 
     * @returns Category name
     */
    // async searchByCategoryName(categoryName: string) {
    //     // await this.categoryRepo.find(categoryName)
    //     return this.categoryRepo.query(`SELECT id, category_name from public.category where category_name = '${categoryName}'`)
    // }

    async findCategories(categoryName: string) {
        console.log('caching in service')
        return await this.categoryRepo.findCategoriesByName(categoryName)

    }

    /**
     * Add product with existing category
     */
    async productAddWithCategory(productDto: ProductsDTO) {
        console.log(productDto)
        let checkCategoryExOrNot = await this.categoryRepo.findOne({ where: { id: productDto.id } })
        console.log("check", checkCategoryExOrNot)
        if (!checkCategoryExOrNot) {
            throw new HttpException("Not found", HttpStatus.NOT_FOUND)
        }
        productDto.category = checkCategoryExOrNot
        let addedRes = await this.productRepo.save(productDto)
        return addedRes;
    }

}