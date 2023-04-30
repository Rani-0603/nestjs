import { ApiProperty } from "@nestjs/swagger";
import { Profile } from "../profile/profile.entity";

/**
 * UserDTO class
 */
export class UserDTO {

    @ApiProperty()
    Id: number;
    /**
     * Column firstName
     */
    @ApiProperty()
    firstName: string;

    /**
     * Column lastName
     */
    @ApiProperty()
    lastName: string;

    /**
     * Column emailId
     */
    @ApiProperty()
    emailId: string;

    @ApiProperty()
    password: string;

    /**
     * Column profile
     */
    @ApiProperty()
    profile: Profile;
}