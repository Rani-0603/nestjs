import { Test } from "@nestjs/testing";
import { Products } from "src/products/products.entity";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";


let user = [{

    Id: 1,
    firstName: "string",
    lastName: "string",
    emailId: "string@abc.com",
    password: "string",
    role: "enum",
    profile: [
        {
            id: 1,
            imageName: "string",
            ImageContent: Uint8Array,
            description: "string"
        }
    ]
}]

describe('Given UserController', () => {
    let userController: UserController;
    let userService: UserService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [UserController],
            providers: [UserService, {
                provide: UserService,
                useFactory: () => ({
                    getAllUser: jest.fn(() => []),
                    getUserWithProfile: jest.fn(() => []),
                    getAllProfiles: jest.fn(() => []),
                    registerUser: jest.fn(() => []),
                    login: jest.fn(() => []),
                    deleteUser: jest.fn(() => []),
                    updateUserInfo: jest.fn(() => [])
                })
            }],
        }).compile();

        userController = moduleRef.get<UserController>(UserController);
        userService = moduleRef.get<UserService>(UserService);
    });

    // describe('When fetchAllUser()', () => {
    //     describe('And when there is data', () => {
    //         it('should return correct data', async () => {
    //             let fetchAllUserSpy = jest.spyOn(userService, 'getAllUser').mockResolvedValue(user);
    //             let res = await UserController.fetchAllUser();
    //             expect(res).toEqual(user);
    //             expect(fetchAllUserSpy).toHaveBeenCalled();
    //             expect(fetchAllUserSpy).toHaveBeenCalledTimes(1);
    //         });
    //     });

    //     describe('And when there is no data', () => {
    //         it('should return correct data', async () => {
    //             let fetchAllUserSpy = jest.spyOn(userService, 'getAllUser').mockResolvedValue([]);
    //             let res = await UserController.fetchAllUser();
    //             expect(res).toEqual([]);
    //             expect(fetchAllUserSpy).toHaveBeenCalled();
    //         });

    //     });

    // });
});