// import { LazyModuleLoader, ModuleRef } from "@nestjs/core";
// import { Test } from "@nestjs/testing";
// import { ProductRepository } from "src/products/products.repository";
// import { Repository } from "typeorm";
// import { CategoriesController } from "./categories.controller";
// import { CategoriesService } from "./categories.service";
// import { CategoryRepository } from "./category.repository";

// describe.skip('Given CategoriesService', () => {
//     let categoriesService: CategoriesService;
//     let categoryRepo: CategoryRepository;
 
//     beforeEach(async () => {
//         let moduleRef = await Test.createTestingModule({
//             providers: [CategoriesService, {
//                 provide: CategoryRepository,
//                 useFactory: () => ({
//                     getCategoryDetail: jest.fn(),
//                     find: jest.fn(),
//                     save: jest.fn(),
//                     findOneBy: jest.fn(),
//                     delete: jest.fn(),
//                     findCategoriesByName: jest.fn(),
//                     findOne: jest.fn()

//                 })
//                 {
//                     provide: ProductRepository,
//                     useFactory: () => ({
//                         save: jest.fn()
//                     })
//                 },{
//                     provide: LazyModuleLoader,
//                     useFactory: ()=> ({
//                         load: jest.fn(),
//                         get: jest.fn(),
//                     })
//                 }

//                 }]
//         }).compile();

//         categoriesService = moduleRef.get<CategoriesService>(CategoriesService);
//         categoryRepo = moduleRef.get<CategoryRepository>(CategoryRepository);
//     })

//     it("should be defined", () => {
//         expect(categoriesService).toBeDefined()
//     })
// })
