import { ILoginUser, IRegisterUser } from "@AUTH/@types/auth.type";
import { routePath } from "@AUTH/routes";
import { AuthService } from "@AUTH/services/auth.service";
import { StatusCode } from "@AUTH/utils/consts";
import { SuccessResponse } from "@AUTH/utils/response";
import {
  Route,
  Post,
  Get,
  SuccessResponse as Success,
  Body,
  Header,
  Middlewares,
  Tags,
} from "tsoa";
import { IAuthController } from "./@types/auth.controller.type";
import { validateDTO } from "@AUTH/middlewares/validate-dto";
import { RegisterDTO } from "@AUTH/dto/register.dto";
import { LoginDTO } from "@AUTH/dto/login.dto";
import { TokenResponseDTO } from "@AUTH/dto/token.dto";
import { validateOrReject, ValidationError } from "class-validator";
import { formatValidationErrors } from "@AUTH/utils/validation";
import { logger } from "@AUTH/utils/logger";
import { ApiError } from "@AUTH/utils/api-error";

@Route("/api/v1")
@Tags("Authentication")
export class AuthController implements IAuthController {
  constructor(private readonly authService: AuthService) {}

  @Success(StatusCode.Created, "Created")
  @Middlewares(validateDTO(RegisterDTO))
  @Post(routePath.REGISTER)
  public async register(
    @Body() user: IRegisterUser
  ): Promise<SuccessResponse<TokenResponseDTO>> {
    try {
      const userToken = await this.authService.register(user);

      const tokenDTO = new TokenResponseDTO(
        userToken.accessToken,
        userToken.refreshToken,
        userToken.expireAt
      );

      await validateOrReject(tokenDTO);

      return new SuccessResponse(`${StatusCode.Created}`, "Created", tokenDTO);
    } catch (error: unknown) {
      if (Array.isArray(error)) {
        // Format and send validation error messages
        const errorMessages = formatValidationErrors(
          error as ValidationError[]
        );

        logger.error(`${errorMessages}`);
        throw new ApiError();
      } else {
        throw error;
      }
    }
  }

  @Success(StatusCode.Created, "Created")
  @Middlewares(validateDTO(LoginDTO))
  @Post(routePath.LOGIN)
  public async login(
    @Body() user: ILoginUser
  ): Promise<SuccessResponse<TokenResponseDTO>> {
    try {
      const userToken = await this.authService.login(user);

      const tokenDTO = new TokenResponseDTO(
        userToken.accessToken,
        userToken.refreshToken,
        userToken.expireAt
      );

      await validateOrReject(tokenDTO);
      return new SuccessResponse(
        `${StatusCode.Created}`,
        "Logged In",
        tokenDTO
      );
    } catch (error: unknown) {
      if (Array.isArray(error)) {
        // Format and send validation error messages
        const errorMessages = formatValidationErrors(
          error as ValidationError[]
        );

        logger.error(`${errorMessages}`);
        throw new ApiError();
      } else {
        throw error;
      }
    }
  }

  @Get(routePath.LOGOUT)
  public async logout(
    @Header("X-access-token") token: string
  ): Promise<SuccessResponse<null>> {
    try {
      await this.authService.logout(token);
      return new SuccessResponse("200", "Logged Out", null);
    } catch (error: unknown) {
      throw error;
    }
  }
}
