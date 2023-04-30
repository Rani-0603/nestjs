import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Products } from "./products.entity";

/**
 * Custom product repository class
 */
@Injectable()
export class ProductRepository extends Repository<Products>{

    constructor(private dataSource: DataSource) {
        super(Products, dataSource.createEntityManager());
    }



}