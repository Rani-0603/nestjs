import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt"
import { JwtPayload } from "./jwt-payload";
import { UserRepository } from "./user.repository";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private userRepo: UserRepository) {
        super({
            secretOrKey: 'abc',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }


    async validate(payload: JwtPayload) {
        try {

            let { emailId } = payload;
            let res = await this.userRepo.findOneByOrFail({ emailId: emailId });
            return res;
        } catch (error) {

            throw new UnauthorizedException(error.message)
        }
    }
}