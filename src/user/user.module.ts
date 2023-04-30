import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { User } from './user.entity';
import { Profile } from "./profile/profile.entity";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { UserRepository } from "./user.repository";
import { JwtStrategy } from "./jwt-strartegy";
/**
 * User Module
 */
@Module({
    controllers: [UserController],
    providers: [UserService, UserRepository, JwtStrategy],
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({
            useFactory: async () => ({
                secret: 'abc',
                signOptions: {
                    expiresIn: '3600s'
                }
            })
        }),
        TypeOrmModule.forFeature([User, Profile])]
})
export class UserModule {


}