import { Body, CacheInterceptor, CacheTTL, Controller, Delete, Get, HttpStatus, Inject, Param, ParseIntPipe, Post, Put, UseFilters, UseGuards, UseInterceptors, UsePipes, ValidationPipe, Version } from "@nestjs/common";
import { ApiBearerAuth, ApiCreatedResponse, ApiHeader, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiResponse, ApiTags } from "@nestjs/swagger";
//import { NOTFOUND } from "dns";
//import { HttpExceptionFilter } from "../common/exception-filter/exception-filter.filter";
//import { TestGuard } from "../common/guards/test.guard";
import { ResponseInterceptor } from "../common/interceptor/response-interceptor.interceptor";
import { ProductsDTO } from "../products/dto/products.dto";
import { Roles } from "../user/decorators/roles.decorator";
import { JwtAuthGuard } from "../user/guards/jwt-auth-guard";
import { RolesGuard } from "../user/guards/roles.guard";
import { Role } from "../user/role";
import { CategoriesService } from "./categories.service";
import { CategoriesDTO } from "./dto/categories.dto";

/**
 * Category controller class
 */
//@UseInterceptors(CacheInterceptor)
@ApiHeader({
    name: 'cnc-header-name',
    enum: [1],
    description: 'Specify version number'
})
//@UsePipes(new ValidationPipe())
// @UseFilters(HttpExceptionFilter)
@UseInterceptors(ResponseInterceptor)
//@UseGuards(TestGuard)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('categories')
 @Controller({
    //path: 'categories',
    //version: '1'
})
export class CategoriesController {

    constructor(private categoriesService: CategoriesService,
        //@Inject('GREET') greet: string,
        //@Inject('NUMBER_LIST') numberList: Array<number>,
        // @Inject('USER_LIST') userList: any
    ) {
        //console.log(greet);
        //console.log(numberList);
        // console.log(userList)

    }

    /**
     * Fetch list of category
     * @returns List of Category
     */
    @ApiOkResponse({ status: HttpStatus.OK, description: 'Category fetched successfully' })
    @ApiInternalServerErrorResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'There is an internal server Error, Try again Later' })
    @ApiNotFoundResponse({ status: HttpStatus.NOT_FOUND, description: 'Data Not Found' })
    // @UseFilters(HttpExceptionFilter)
    // @UseInterceptors(ResponseInterceptor)
    //@UseGuards(TestGuard)
    @Get()
    async listCategories(): Promise<CategoriesDTO[]> {
        console.log('caching in contoller')
        return await this.categoriesService.fetchAllCategories();
    }

    /**
     * Get category details based on id
     * @param id category Id
     * @returns Category Details
     */
    @ApiOkResponse({ status: HttpStatus.OK, description: 'Category fetched successfully by given id' })
    @ApiInternalServerErrorResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'There is an internal server Error, Try again Later' })
    @ApiNotFoundResponse({ status: HttpStatus.NOT_FOUND, description: 'No Category Found For Given Id' })
    // @UseFilters(HttpExceptionFilter)
    @Get(':id')
    async getByCategoriesId(@Param('id', ParseIntPipe) id: number): Promise<CategoriesDTO> {
        console.log(id, "in controller")
        return await this.categoriesService.getByCategoryId(id);
    }

    /**
     * Create new category
     * @param categoriesDTO Specify category Name
     * @returns Newly created Category
     */
    @ApiCreatedResponse({ status: HttpStatus.CREATED, description: 'Category added successfully' })
    @ApiInternalServerErrorResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'There is an internal server Error, Try again Later' })
    // @UseFilters(HttpExceptionFilter)
    @Post()
    async createCategories(@Body(new ValidationPipe()) categoriesDTO: CategoriesDTO): Promise<CategoriesDTO> {
        return await this.categoriesService.addCategory(categoriesDTO)
    }

    /**
     * updated Category based on Id
     * @param categoriesDTO 
     * @param id cayegory Id
     * @returns Updated category list
     */
    @ApiOkResponse({ status: HttpStatus.OK, description: 'Updated Successfully' })
    @ApiInternalServerErrorResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'There is an internal server Error, Try again Later' })
    // @UseFilters(HttpExceptionFilter)
    @Put(':id')
    updateCategories(@Body() categoriesDTO: CategoriesDTO, @Param('id') id: number): CategoriesDTO {
        return this.categoriesService.updateCategory(categoriesDTO, id)
    }

    /**
     * Delete Category By Id
     * @returns  no. of affected row
     */
    @ApiOkResponse({ status: HttpStatus.OK, description: 'Deleted Successfully' })
    @ApiNotFoundResponse({ status: HttpStatus.NOT_FOUND, description: 'Category Not Found' })
    @ApiInternalServerErrorResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'There is an internal server Error, Try again Later' })
    @Roles(Role.Admin)
    @UseGuards(RolesGuard)
    @Delete(':id')
    deleteCategories(@Param('id') id: number) {
        return this.categoriesService.deleteCategory(id);
    }

    /**
     * Fetch all category with product details
     * @returns  List of category with product
     */
    @ApiOkResponse({ status: HttpStatus.OK, description: 'Category fetched successfully with product' })
    @ApiInternalServerErrorResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'There is an internal server Error, Try again Later' })
    @ApiNotFoundResponse({ status: HttpStatus.NOT_FOUND, description: 'No category Found with product' })
    @Get('all/products')
    getCategoryWithProducts() {
        return this.categoriesService.getCategoryWithProducts();
    }

    /**
     * Create new category with product
     * @param categoryDTO 
     * @returns New list of category with product
     */
    @ApiOkResponse({ status: HttpStatus.OK, description: 'Updated category with product successfully' })
    @ApiInternalServerErrorResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'There is an internal server Error, Try again Later' })
    @Version('2')
    @Post('/products')
    addCategoryWithProducts(@Body() categoryDTO: CategoriesDTO) {

        return this.categoriesService.addCategoryWithProducts(categoryDTO)
    }

    /**
     * Fetch category by name
     * @returns List of category by name
     */
    // @Get('by-name/:categoryName')
    // searchByCategoryName(@Param('categoryName') categoryName: string) {
    //     return this.categoriesService.searchByCategoryName(categoryName)
    // }
    @CacheTTL(15)
    @ApiHeader({
        name: 'cnc-header-name',
        enum: ['1', '2', '3'],
        description: 'Specify version number'
    })
    @Version(['1', '2', '3'])
    @Get('by-name/:categoryName')
    findCategoriesByName(@Param('categoryName') categoryName: string) {
        console.log('caching in contoller')
        return this.categoriesService.findCategories(categoryName)
    }

    /**
     * Add product with existing category
     * @param categoryDTO 
     * @returns New list of record
     */
    @ApiOkResponse({ status: HttpStatus.OK, description: 'Updated category with product successfully' })
    @ApiInternalServerErrorResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'There is an internal server Error, Try again Later' })
    @Post('/addproducts')
    productAddWithCategory(@Body() productDto: ProductsDTO) {

        return this.categoriesService.productAddWithCategory(productDto)
    }
}