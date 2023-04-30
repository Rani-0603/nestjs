import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Category } from "./category.entity";
import { CategoriesDTO } from "./dto/categories.dto"

/**
 * Custom category repository class
 */
@Injectable()
export class CategoryRepository extends Repository<Category>{
    // get(arg0: string): import("./dto/categories.dto").CategoriesDTO[] | PromiseLike<import("./dto/categories.dto").CategoriesDTO[]> {
    //     //throw new Error("Method not implemented.");
    // }
    /**
     * Constructor class
     */
    constructor(private dataSource: DataSource) {
        super(Category, dataSource.createEntityManager());
    }

    /**
     * Get all category details
     * @returns list of category Details
     */
    getCategoryDetail() {
        return this.query("select id, category_name from public.category");
    }

    /**
     * Search category by name
     * @param categoryName 
     * @returns Category by name
     */
    findCategoriesByName(categoryName: string) {
        //console.log('custom repo')
        return this.query(`SELECT id, category_name from public.category where category_name = '${categoryName}'`)
    }

}