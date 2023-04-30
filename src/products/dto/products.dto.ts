import { ApiProperty } from "@nestjs/swagger"
import { IsString, Length } from "class-validator";
import { Category } from "../../categories/category.entity";

/**
 * ProductDTO class
 */
export class ProductsDTO {


    @ApiProperty()
    id: number
    /**
     * Column product Name
     */
    @ApiProperty()
    productName: string

    /**
     * Column price
     */
    @ApiProperty()
    price: number;

    /**
     * Column quantity
     */
    @ApiProperty()
    quantity: number;

    /**
     * Column description
     */
    @ApiProperty()
    description: string;

    /**
     * Column createdOn
     */
    @ApiProperty()
    createdOn: Date;

    /**
     * Column updatedOn
     */
    @ApiProperty()
    updatedOn: Date;

    @ApiProperty()
    category: Category
    // @ApiProperty()
    // id: number;

    // @ApiProperty(
    //     {
    //         description: 'Category name description',
    //         required: true
    //     }
    // )
    // @IsString({ message: 'Category name must be string' })
    // @Length(2, 20, { message: 'Category Name should be between 2-20' })
    // productName: string;

}