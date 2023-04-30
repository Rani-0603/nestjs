import { Test } from "@nestjs/testing";
import { DataSource } from "typeorm";
import { UserRepository } from "./user.repository";

describe('Given categoryRepository', () => {
    let userRepo: UserRepository;


    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [UserRepository, {
                provide: DataSource,
                useFactory: () => ({
                    createEntityManager: jest.fn(() => []),

                })
            }],
        }).compile();

        userRepo = moduleRef.get<UserRepository>(UserRepository);
    });

    it("should be defined", () => {
        expect(userRepo).toBeDefined();
        //expect(productsController).not.toBeUndefined();
    });
});