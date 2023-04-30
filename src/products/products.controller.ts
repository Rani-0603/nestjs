import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from '../common/exception-filter/exception-filter.filter';
import { ProductsDTO } from './dto/products.dto';
import { ProductsService } from "./products.service";

/**
 * Product controller class
 */

//@UsePipes(new ValidationPipe())
//  @UseFilters(HttpExceptionFilter)
@ApiTags('products')
@Controller('products')
export class ProductsController {

    constructor(private productsService: ProductsService) {

    }

    /**
     * Fetch all Products
     * @returns list of products
     */
    @ApiOkResponse({ status: HttpStatus.OK, description: 'Product fetched successfully' })
    @ApiInternalServerErrorResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'There is an internal server Error, Try again Later' })
    @ApiNotFoundResponse({ status: HttpStatus.NOT_FOUND, description: 'Data Not Found' })
    @UseFilters(HttpExceptionFilter)
    @Get()
    async AllProducts(): Promise<ProductsDTO[]> {
        console.log('caching in controller')
        return await this.productsService.fetchAllProducts();
    }


    /**
     * Get product details based on id
     * @returns List of product based Id
     */
    @ApiOkResponse({ status: HttpStatus.OK, description: 'Product fetched successfully by given Id' })
    @ApiInternalServerErrorResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'There is an internal server Error, Try again Later' })
    @ApiNotFoundResponse({ status: HttpStatus.NOT_FOUND, description: 'No product found for given Id' })
    // @UseFilters(HttpExceptionFilter)
    @Get(':id')
    async getProductById(@Param('id') id: number): Promise<ProductsDTO> {
        return await this.productsService.getByProductId(id)
    }

    /**
     * Get product by name
     * @returns List of product by name
     */
    @ApiOkResponse({ status: HttpStatus.OK, description: 'Product fetched successfully by given Id' })
    @ApiInternalServerErrorResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'There is an internal server Error, Try again Later' })
    @Get('/details/:productName')
    async getbyProductsname(@Param('productName') productName: string): Promise<ProductsDTO> {
        return await this.productsService.getProductName(productName);
    }

    /**
     * Create new product
     * @post Newly created record
     */
    @ApiCreatedResponse({ status: HttpStatus.CREATED, description: 'Product added successfully' })
    @ApiInternalServerErrorResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'There is an internal server Error, Try again Later' })
    // @UseFilters(HttpExceptionFilter)
    @Post()
    async addProducts(@Body(new ValidationPipe()) productsDTO: ProductsDTO): Promise<ProductsDTO> {
        return await this.productsService.addProducts(productsDTO)
    }

    /**
     * Update product based on Id
     * @param productsDTO 
     * @param id 
     * @returns Updated record based on Id
     */
    @ApiOkResponse({ status: HttpStatus.OK, description: 'Updated Successfully' })
    @ApiInternalServerErrorResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'There is an internal server Error, Try again Later' })
    // @UseFilters(HttpExceptionFilter)
    @Put(':id')
    updateProducts(@Body() productsDTO: ProductsDTO, @Param('id') id: number): ProductsDTO {
        return this.productsService.updateProducts(productsDTO, id)
    }

    /**
     * Delete product based on Id
     *@returns No of affected row.
     */
    @ApiOkResponse({ status: HttpStatus.OK, description: 'Deleted Successfully' })
    @ApiNotFoundResponse({ status: HttpStatus.NOT_FOUND, description: 'Product Not Found' })
    @ApiInternalServerErrorResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'There is an internal server Error, Try again Later' })
    // @UseFilters(HttpExceptionFilter)
    @Delete(':id')
    async deleteProduct(@Param('id') id: number) {
        return await this.productsService.deleteProduct(id);
    }


}
