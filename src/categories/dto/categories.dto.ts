import { ApiProperty } from "@nestjs/swagger"
import { IsString, Length } from "class-validator";
import { Products } from "src/products/products.entity";

/**
 * CategoryDTO class
 */
export class CategoriesDTO {

    /**
     * Column id
     */
    @ApiProperty()
    id: number;

    /**
     * Column category name
     */
    @ApiProperty({
        //name: 'Category Name',
        description: 'Category name description',
        required: true
    })
    @IsString({ message: 'Category name must be string' })
    @Length(2, 20, { message: 'Category Name should be between 2-20' })
    categoryName: string;

    /**Column product */
    @ApiProperty()
    products: Products[]

    // @IsString()
    // addedBy: string;
    // isActive: string,

    // createdOn: Date,
    // deletedOn: Date
}