import { Test } from "@nestjs/testing";
import { DataSource } from "typeorm";
import { CategoryRepository } from "./category.repository";

const mockRes = {
    id: 1, categoryName: "cloth", isActive: "y", createdOn: new Date(), deletedOn: new Date(),
    products: [{
        id: 1,
        productName: "string",
        price: 10,
        quantity: 7,
        description: "string",
        createdOn: new Date(),
        updatedOn: new Date(),
        category: {
            id: 1, categoryName: "cloth", isActive: "y", createdOn: new Date(),
            deletedOn: new Date(), products: []

        }
    }],
}

describe('Given categoryRepository', () => {
    let categoryRepo: CategoryRepository;


    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [CategoryRepository, {
                provide: DataSource,
                useFactory: () => ({
                    createEntityManager: jest.fn(() => []),

                })
            }],
        }).compile();

        categoryRepo = moduleRef.get<CategoryRepository>(CategoryRepository);
    });

    it("should be defined", () => {
        expect(categoryRepo).toBeDefined();
        //expect(productsController).not.toBeUndefined();
    });

    describe('when getCategoryDetail()', () => {
        it('should return data', async () => {
            let querySpy = jest.spyOn(categoryRepo, 'query').mockResolvedValue([mockRes]);
            let res = await categoryRepo.getCategoryDetail();
            expect(res).toEqual([mockRes]);
            expect(querySpy).toHaveBeenCalled();
            expect(querySpy).toHaveBeenCalledTimes(1);

        });

    });

    describe('when findCategoriesByName()', () => {
        it('should return data', async () => {
            let querySpy = jest.spyOn(categoryRepo, 'query').mockResolvedValue([mockRes]);
            let res = await categoryRepo.findCategoriesByName('cloth');
            expect(res).toEqual([mockRes]);
            expect(querySpy).toHaveBeenCalled();

        });

    });
});