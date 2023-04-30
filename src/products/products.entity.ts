import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Category } from '../categories/category.entity';
import { ManyToOne } from 'typeorm'

/**
 * Product entity class
 */
@Entity('products')
export class Products {

    /**
     * Column id
     */
    @PrimaryGeneratedColumn()
    id: number;

    /**
     * Column product name
     */
    @Column({ name: 'product_name', type: 'varchar', unique: true, length: 10 })
    productName: string

    /**
     * Column price
     */
    @Column()
    price: number;

    /**
     * Column quantity
     */
    @Column()
    quantity: number;

    /**
     * Column description
     */
    @Column({ type: 'text' })
    description: string;

    /**
     * Column createdOn
     */
    @CreateDateColumn()
    createdOn: Date;

    /**
     * Column updatedOn
     */
    @UpdateDateColumn()
    updatedOn: Date;

    /**
     * Created relation with category
     */
    @ManyToOne(() => Category, (category) => category.products, {
        cascade: true
    })


    category: Category;

}