import { AuthService } from "@CRUD_PG/services/auth.service";
import { IAuthController, IAuthResponse } from "./@types/auth.controller.type";
import { IUser } from "@CRUD_PG/@types/user.type";
import { ILoginUser } from "@CRUD_PG/@types/auth.type";
import { SuccessResponse } from "@CRUD_PG/utils/response";
import { Get, Post, Route, SuccessResponse as Success } from "tsoa";
import { routePath } from "@CRUD_PG/routes";
import { StatusCode } from "@CRUD_PG/utils/consts";

@Route("/api/v1")
export class AuthController implements IAuthController {
  constructor(private readonly authService: AuthService) {}

  @Success(StatusCode.Created, "Created")
  @Post(routePath.REGISTER)
  public async register(user: IUser): Promise<IAuthResponse> {
    try {
    } catch (error: unknown) {
      throw error;
    }
  }
  @Success(StatusCode.Created, "Created")
  @Post(routePath.LOGIN)
  public async login(user: ILoginUser): Promise<IAuthResponse> {
    try {
    } catch (error: unknown) {
      throw error;
    }
  }

  @Get(routePath.LOGOUT)
  public async logout(id: string): Promise<SuccessResponse<null>> {
    try {
    } catch (error: unknown) {
      throw error;
    }
  }
}
