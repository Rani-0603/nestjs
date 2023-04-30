import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, SetMetadata, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiCreatedResponse, ApiHeader, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { Roles } from "./decorators/roles.decorator";
import { LoginDTO } from "./dto/login.dto";
import { UserDTO } from "./dto/user.dto";
import { JwtAuthGuard } from "./guards/jwt-auth-guard";
import { RolesGuard } from "./guards/roles.guard";
import { Role } from "./role";
import { User } from "./user.entity";
import { UserService } from "./user.service";

/**
 * User controller class
 */
// @ApiHeader({
//     name: 'cnc-header-name',
//     enum: [1, 2, 3],
//     description: 'Specify version number'
// })
@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UserController {
    constructor(private userService: UserService) { }

    /**
     * Fetch user list
     * @returns List of user
     */
    @ApiOkResponse({ status: HttpStatus.OK, description: 'User fetched successfully' })
    @ApiInternalServerErrorResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'There is an internal server Error, Try again Later' })
    @ApiNotFoundResponse({ status: HttpStatus.NOT_FOUND, description: 'Data Not Found' })
    @UseGuards(JwtAuthGuard)
    @Get()
    fetchAllUser() {
        return this.userService.getAllUser()
    }

    /**
     * To get user with profile
     * @returns List of user with profile
     */
    @ApiOkResponse({ status: HttpStatus.OK, description: 'Fetch user with profile successfully' })
    @ApiInternalServerErrorResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'There is an internal server Error, Try again Later' })
    @ApiNotFoundResponse({ status: HttpStatus.NOT_FOUND, description: 'User-Profile data not found' })

    @Roles(Role.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('/profiles')
    fetchUserWithProfile() {
        return this.userService.getUserWithProfile();
    }

    /**
     * Get only profile details
     * @returns List of profile
     */
    @ApiOkResponse({ status: HttpStatus.OK, description: 'Fetched profile successfully' })
    @ApiInternalServerErrorResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'There is an internal server Error, Try again Later' })
    @ApiNotFoundResponse({ status: HttpStatus.NOT_FOUND, description: 'Profile data not found' })
    @Get('/all-profile')
    getAllProfiles() {
        return this.userService.getAllProfiles();
    }

    /**
     * To save user details
     * @param user 
     * @returns List of user
     */
    @ApiCreatedResponse({ status: HttpStatus.CREATED, description: 'User added successfully' })
    @ApiInternalServerErrorResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'There is an internal server Error, Try again Later' })
    @Post('')
    registerUser(@Body() user: UserDTO): Promise<string> {
        return this.userService.registerUser(user)
    }

    @Post('/login')
    LoginDTO(@Body() user: LoginDTO): Promise<{ token }> {
        return this.userService.login(user)

    }


    /**
     * Delete user
     * @returns Affected row 
     */
    @Roles(Role.Admin)
    @UseGuards(RolesGuard)
    @Delete(':id')
    deleteUser(@Param('id') id: number) {
        console.log("get id in controller,", id)
        return this.userService.deleteUser(id);
    }

    /**
     * Update existing user
     * @returns updated record
     */
    @ApiOkResponse({ status: HttpStatus.OK, description: 'Updated user-profile successfully' })
    @ApiInternalServerErrorResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'There is an internal server Error, Try again Later' })
    @Patch(':id')
    updateUserInfo(@Param('id') id: number, @Body('user') user: UserDTO) {
        return this.userService.updateUserInfo(id, user);

    }

}