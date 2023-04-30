import { HttpException, HttpStatus, Injectable, InternalServerErrorException, Logger, Provider, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from 'bcryptjs';
import { UserDTO } from "./dto/user.dto";
import { Profile } from "./profile/profile.entity";
import { User } from "./user.entity";
import { LoginDTO } from "./dto/login.dto";
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "./jwt-payload";
import { UserRepository } from "./user.repository";
import { EventEmitter2, OnEvent } from "@nestjs/event-emitter";
import { Cron, CronExpression } from "@nestjs/schedule";
import { Interface } from "readline";

/**
 * User service class
 */
@Injectable()
export class UserService {

    logger = new Logger(UserService.name)
    //static UserRepository: Provider<any>;// check it is right or not
    constructor(
        //@InjectRepository(User) private userRepo: Repository<User>,
        private userRepo: UserRepository,// custom repo
        @InjectRepository(Profile) private profileRepo: Repository<Profile>,
        private jwtService: JwtService,
        private eventEmitter: EventEmitter2

    ) { }

    /**
     * To save User
     * @param user 
     * @returns Register user
     */
    async registerUser(user: UserDTO): Promise<string> {
        try {
            let salt = await bcrypt.genSalt();
            console.log("salt", salt)
            let hashedPassword = await bcrypt.hash(user.password, salt);
            console.log("hashedpassword", hashedPassword)
            user.password = hashedPassword;  //here we are going to save original password with hased password
            let res = await this.userRepo.save(user);
            if (res?.Id) {
                let msg = `User registered successfully with Id: ${res.Id}`;
                this.logger.log(msg);
                return msg;
            } else {
                const msg = "something went wrong ,Try again.";
                this.logger.error(msg);
                throw new InternalServerErrorException(msg)
            }
        } catch (error) {
            throw new InternalServerErrorException(error.message)

        }
    }

    async login(user: LoginDTO): Promise<{ token }> {
        try {
            let userDetail = await this.userRepo.findOneByOrFail({ emailId: user.emailId });
            if (userDetail && await bcrypt.compare(user.password, userDetail.password)) {
                let jwtPayload: JwtPayload = { emailId: userDetail.emailId };
                let token = await this.jwtService.sign(jwtPayload);
                this.eventEmitter.emit('user-loggedin-event',
                    { emailId: userDetail.emailId, fullname: `${userDetail.firstName} ${userDetail.lastName}` }
                )
                return { token };
            } else {
                const msg = 'Invalid Credential';
                this.logger.warn(msg)
                throw new UnauthorizedException(msg);
            }

        } catch (error) {
            throw new InternalServerErrorException(error.message)
        }
    }

    /**
     * Fetch all user
     * @returns List of user
     */
    async getAllUser() {
        return await this.userRepo.find();
        // return await this.userRepo.find({ relations: ['profile'] });
    }

    /**
     * Fetch user detail with profile
     * @returns List of user profile
     */
    async getUserWithProfile() {
        return await this.userRepo.find();
        // return await this.userRepo.find({ relations: ['profile'] });
    }

    /**
     * Fetch only profile details
     * @returns List of profiles
     */
    async getAllProfiles() {
        return this.profileRepo.find();
    }

    /**
     * update existing user
     * @param id 
     * @param user 
     * @returns Updated list of user with profile
     */
    async updateUserInfo(id: number, user: UserDTO) {
        //return await this.userRepo.save(user);
        try {

            let res = await this.userRepo.save(user);
            return res;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Delete user with id
     * @param id 
     * @returns Return affected row
     */
    async deleteUser(id: number): Promise<any> {
        console.log("get id in controller,", id)
        const userProfile = await this.userRepo.findOneBy({ Id: id })
        console.log(userProfile)
        if (userProfile && userProfile.profile && userProfile.profile.id) {
            console.log(userProfile)
            const profileResult = await this.profileRepo.findOne({ where: { id: userProfile.profile.id } });
            //console.log(profileResult)

            if (profileResult && profileResult.id) {
                //return await this.profileRepo.delete(profileResult.id);
                const res = await this.profileRepo.delete(profileResult.id);
                if (res.affected == 1) {
                    return { status: 200, message: "user deleted" };
                } else {
                    throw new InternalServerErrorException();
                }
            } else return profileResult;
        } else return userProfile;

    }
    @OnEvent('user-loggedin-event')
    notifyLog(data) {
        console.log("user service", data)
        this.logger.warn(`${data.fullname} has loggedin @${new Date()}`)
    }


    //@Cron(CronExpression.EVERY_10_SECONDS)
    // @Interface(100)
    //@Timeout(1000)
    getAllUserList() {
        let res = this.getAllUser();
        console.log(res)
    }
}