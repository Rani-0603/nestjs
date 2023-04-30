import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Products } from '../products/products.entity';
import { OneToMany } from 'typeorm'

/**
 * Category entity class
 */
@Entity('category')
export class Category {

    /**
     * Column id
     */
    @PrimaryGeneratedColumn()
    id: number;

    /**
     * Column categoryName
     */
    @Column({ name: 'category_name', type: 'varchar', unique: true, length: 10, nullable: false })
    categoryName: string;

    /**
     * Column is Active
     */
    @Column({ name: 'isActive', type: 'varchar', length: '1', default: 'y' })
    isActive: string;

    /**
     * Column createdOn
     */
    @CreateDateColumn()
    createdOn: Date;

    /**
     * Column deletedOn
     */
    @DeleteDateColumn()
    deletedOn: Date;

    /**
     * Created relation with product 
     */
    @OneToMany(() => Products, (product) => product.category)
    products: Products[]



}