import { Test } from "@nestjs/testing";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";

let product = [{
    id: 1,
    productName: "string",
    price: 10,
    quantity: 7,
    description: "string",
    createdOn: new Date(),
    updatedOn: new Date(),
    category: {
        id: 1, categoryName: "cloth", isActive: "y", createdOn: new Date(), deletedOn: new Date(), products: []

    }
}]

let newproduct = {
    id: 1,
    productName: "string",
    price: 10,
    quantity: 7,
    description: "string",
    createdOn: new Date(),
    updatedOn: new Date(),
    category: {
        id: 1, categoryName: "cloth", isActive: "y", createdOn: new Date(), deletedOn: new Date(),
        products: []
    }
}

let updateproduct = {
    id: 1,
    productName: "string",
    price: 10,
    quantity: 7,
    description: "string",

}
describe('Given ProductController', () => {
    let productsController: ProductsController;
    let productsService: ProductsService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [ProductsController],
            providers: [ProductsService, {
                provide: ProductsService,
                useFactory: () => ({
                    fetchAllProducts: jest.fn(() => []),
                    getByProductId: jest.fn(() => []),
                    getProductName: jest.fn(() => []),
                    addProducts: jest.fn(() => []),
                    updateProducts: jest.fn(() => []),
                    deleteProduct: jest.fn(() => []),
                    //getbyProductsname: jest.fn(() => [])
                })
            }],
        }).compile();

        productsController = moduleRef.get<ProductsController>(ProductsController);
        productsService = moduleRef.get<ProductsService>(ProductsService);
    });

    it("should be defined", () => {
        expect(productsController).toBeDefined();
        //expect(productsController).not.toBeUndefined();
    });

    describe('When fetchAllProducts()', () => {
        describe('And when there is data', () => {
            it('should return correct data', async () => {
                let fetchAllProductsSpy = jest.spyOn(productsService, 'fetchAllProducts').mockResolvedValue(product);
                let res = await productsController.AllProducts();
                expect(res).toEqual(product);
                expect(fetchAllProductsSpy).toHaveBeenCalled();
                expect(fetchAllProductsSpy).toHaveBeenCalledTimes(1);
            });
        });

        describe('And when there is no data', () => {
            it('should return correct data', async () => {
                let fetchAllProductsSpy = jest.spyOn(productsService, 'fetchAllProducts').mockResolvedValue([]);
                let res = await productsController.AllProducts();
                expect(res).toEqual([]);
                expect(fetchAllProductsSpy).toHaveBeenCalled();
            });

        });

    });


    describe('when getByProductId(1)', () => {
        it('should return data', async () => {
            let getbyProductidSpy = jest.spyOn(productsService, 'getByProductId').mockResolvedValue(newproduct);
            let res = await productsController.getProductById(1);
            expect(res).toEqual(newproduct);
            expect(getbyProductidSpy).toHaveBeenCalled();
            expect(getbyProductidSpy).toHaveBeenCalledTimes(1);

        });

    });



    describe('when getbyProductsname(abc)', () => {
        it('should return data', async () => {
            let getbyProductsnameSpy = jest.spyOn(productsService, 'getProductName').mockResolvedValue(newproduct);
            let res = await productsController.getbyProductsname('abc');
            expect(res).toEqual(newproduct);
            expect(getbyProductsnameSpy).toHaveBeenCalled();
            expect(getbyProductsnameSpy).toHaveBeenCalledTimes(1);
            expect(getbyProductsnameSpy).toHaveBeenCalledWith('abc');

        });

    });



    describe('when addProducts', () => {
        it('should return new product', async () => {
            let addProductsSpy = jest.spyOn(productsService, 'addProducts').mockResolvedValue(newproduct);
            let res = await productsController.addProducts(product[0]);
            expect(res).toEqual(newproduct);
            expect(addProductsSpy).toHaveBeenCalled();
            expect(addProductsSpy).toHaveBeenCalledTimes(1);

        });

    });


    // describe('when updateProducts', () => {
    //     it('should return new product', async () => {
    //         let updateProductsSpy = jest.spyOn(productsService, 'updateProducts').mockResolvedValue(product);
    //         let res = await productsController.updateProducts('abc', 1);
    //         expect(res).toEqual(product);
    //         expect(updateProductsSpy).toHaveBeenCalled();
    //         expect(updateProductsSpy).toHaveBeenCalledTimes(1);

    //     });

    // });

    // describe('when deleteProduct', () => {
    //     it('should return new product', async () => {
    //         let deleteProductsSpy = jest.spyOn(productsService, 'deleteProduct').mockResolvedValue(product);
    //         let res = await productsController.deleteProduct(1);
    //         expect(res).toEqual(product);
    //         expect(deleteProductsSpy).toHaveBeenCalled();
    //         expect(deleteProductsSpy).toHaveBeenCalledTimes(1);

    //     });

    // });
})