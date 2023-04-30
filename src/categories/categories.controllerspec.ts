import { Test } from "@nestjs/testing";
import { CategoriesController } from "./categories.controller";
import { CategoriesService } from "./categories.service";


let category = {
    id: 1,
    categoryName: "Clothings",
    products: []
}

let delcategory = {
    id: 1,
    categoryName: "Clothings",

}

let newCategory = {
    id: 1,
    categoryName: 'Cloth',
    products: [{
        id: 1,
        productName: 'string',
        price: 10000,
        quantity: 2,
        description: 'string',
        createdOn: new Date(),
        updatedOn: new Date(),
        category: {
            id: 1, categoryName: "cloth", isActive: "y", createdOn: new Date(), deletedOn: new Date(), products: []
        }

    }]

}

describe('Given CategoriesController', () => {
    let categoriesController: CategoriesController;
    let categoriesService: CategoriesService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [CategoriesController],
            providers: [CategoriesService, {
                provide: CategoriesService,
                useFactory: () => ({
                    fetchAllCategories: jest.fn(() => []),
                    getByCategoryId: jest.fn(() => []),
                    addCategory: jest.fn(() => []),
                    updateCategory: jest.fn(() => []),
                    deleteCategory: jest.fn(() => []),
                    getCategoryWithProducts: jest.fn(() => []),
                    addCategoryWithProducts: jest.fn(() => []),
                    findCategories: jest.fn(() => []),
                    productAddWithCategory: jest.fn(() => [])
                })
            }],
        }).compile();

        categoriesController = moduleRef.get<CategoriesController>(CategoriesController);
        categoriesService = moduleRef.get<CategoriesService>(CategoriesService);
    })


    it("should be defined", () => {
        expect(CategoriesController).toBeDefined()
    })

    describe("When listCategories()", () => {
        it("should return data", async () => {
            let listCategoriesSpy = jest.spyOn(categoriesService, 'fetchAllCategories').mockResolvedValue([category])
            let resp = await categoriesController.listCategories();
            expect(resp).toEqual([category]);
            expect(listCategoriesSpy).toHaveBeenCalled();
            expect(listCategoriesSpy).toHaveBeenCalledTimes(1);

        });
    });


    describe('When getCategoryById(1)', () => {

        it('should return data', async () => {
            let fetchByNameSpy = jest.spyOn(categoriesService, 'getByCategoryId').mockResolvedValue(newCategory)
            let result = await categoriesController.getByCategoriesId(1);
            expect(result).toEqual(newCategory);
            expect(fetchByNameSpy).toHaveBeenCalled();
            expect(fetchByNameSpy).toHaveBeenCalledTimes(1);
            expect(fetchByNameSpy).toHaveBeenCalledWith(1);

        })

    })

    describe("When createCategories", () => {
        it("should return data", async () => {
            let addCategorySpy = jest.spyOn(categoriesService, 'addCategory').mockResolvedValue(category)
            let resp = await categoriesController.createCategories(category)
            expect(resp).toEqual(category);
            expect(addCategorySpy).toHaveBeenCalled();
            expect(addCategorySpy).toHaveBeenCalledTimes(1);
        })
    })

    // describe("When deleteCategories()", () => {
    //     it("should return data", async () => {
    //         let addCategorySpy = jest.spyOn(categoriesService, 'deleteCategory').mockResolvedValue(delcategory)
    //         let resp = await categoriesController.deleteCategories(10);
    //         expect(resp).toEqual(delcategory);
    //         expect(resp).toBeUndefined();
    //         expect(addCategorySpy).toHaveBeenCalled();
    //         expect(addCategorySpy).toHaveBeenCalledTimes(1);
    //         expect(addCategorySpy).toHaveBeenCalledWith(10);
    //     })
    // })
});