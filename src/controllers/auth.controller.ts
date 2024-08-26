import { ILoginUser } from "@AUTH/@types/auth.type";
import { IUser } from "@AUTH/@types/user.type";
import { routePath } from "@AUTH/routes";
import { AuthService } from "@AUTH/services/auth.service";
import { StatusCode } from "@AUTH/utils/consts";
import { SuccessResponse } from "@AUTH/utils/response";
import { Route, Post, Get, SuccessResponse as Success } from "tsoa";
import { IAuthController, IAuthResponse } from "./@types/auth.controller.type";

@Route("/api/v1")
export class AuthController implements IAuthController {
  constructor(private readonly authService: AuthService) {}

  @Success(StatusCode.Created, "Created")
  @Post(routePath.REGISTER)
  public async register(user: IUser): Promise<IAuthResponse> {
    try {
      console.log("role:");
      const createUser = await this.authService.register(user);
      return new SuccessResponse("", "Created", createUser);
    } catch (error: unknown) {
      throw error;
    }
  }

  @Success(StatusCode.Created, "Created")
  @Post(routePath.LOGIN)
  public async login(user: ILoginUser): Promise<IAuthResponse> {
    try {
      const userDetails = await this.authService.login(user);
      return new SuccessResponse("", "Logged In", userDetails);
    } catch (error: unknown) {
      throw error;
    }
  }

  @Get(routePath.LOGOUT)
  public async logout(id: string): Promise<SuccessResponse<null>> {
    try {
      await this.authService.logout(id);
      return new SuccessResponse("200", "Logged Out", null);
    } catch (error: unknown) {
      throw error;
    }
  }
}
