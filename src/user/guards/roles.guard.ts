import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { ROLES_KEY } from "../decorators/roles.decorator";
import { Role } from "../role";
import { User } from "../user.entity";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        const reqObj = context.switchToHttp().getRequest();
        console.log("role guard...", reqObj);
        console.log("----------")
        console.log("User Req", reqObj.user);

        //return requiredRoles.some((role) => user.role?.includes(role));
        return requiredRoles.some((role) => reqObj.user.role.includes(role));
        // console.log(requiredRoles)
        // return true;
    }

}