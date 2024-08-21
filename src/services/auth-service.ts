import { IUser } from "@CRUD_PG/@types/user.type";
// import { RoleRepository } from "@CRUD_PG/database/repositories/role.repository";
// import { SessionRepository } from "@CRUD_PG/database/repositories/session.repository";
// import { UserRoleRepository } from "@CRUD_PG/database/repositories/user-role.repository";
import { UserRepository } from "@CRUD_PG/database/repositories/user.repository";
import { StatusCode } from "@CRUD_PG/utils/consts";
import { HttpException } from "@CRUD_PG/utils/http-exception";
import { TokenService } from "@CRUD_PG/utils/jwt";
import { SuccessResponse } from "@CRUD_PG/utils/response";

export class AuthService {
  private _tokenService: TokenService;
  constructor(
    private userRepository: UserRepository
  ) // private sessionRepository: SessionRepository,
  // private userRolerservice: UserRoleRepository,
  // private rolesService: RoleRepository
  {
    this._tokenService = new TokenService();
  }
  async register(user: IUser) {
    try {
      console.log(user);
      const createUser = await this.userRepository.create(user);
      if (!createUser) {
        throw new HttpException("Invalid User", StatusCode.BadRequest);
      }
      const token = this._tokenService.issueToken(createUser);
      const data = {
        token,
        user: createUser,
      };
      return new SuccessResponse("", "Register Successfull.", data);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        "Failed to Register",
        StatusCode.InternalServerError
      );
    }
  }
  async getAllUsers() {
    try {
      const user = "Hello  World";
      if (!user) {
        throw new HttpException("No User Found", StatusCode.NotFound);
      }
      return new SuccessResponse("", "Get Users", user);
    } catch (error) {
       console.log(error)
      if (error instanceof HttpException) {
        throw error;
      }
      
      throw new HttpException(
        "failed to create user",
        StatusCode.InternalServerError
      );
    }
  }
}
