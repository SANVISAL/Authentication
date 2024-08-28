import { SuccessResponse } from "@AUTH/utils/response";
import {
  Get,
  Route,
  Security,
  Tags,
  Request,
  SuccessResponse as Success,
  Put,
  Body,
  Middlewares,
} from "tsoa";
import { routePath } from "@AUTH/routes";
import { IUserController } from "./@types/user.controller.type";
import { UserProfileDTO, UserUpdateDTO } from "@AUTH/dto/user.dto";
import { StatusCode } from "@AUTH/utils/consts";
import { UserService } from "@AUTH/services/user.service";
import { RequestWithUser } from "@AUTH/middlewares/authentication";
import { validateOrReject, ValidationError } from "class-validator";
import { formatValidationErrors } from "@AUTH/utils/validation";
import { ApiError } from "@AUTH/utils/api-error";
import { logger } from "@AUTH/utils/logger";
import { IUpdateUser } from "@AUTH/@types/user.type";
import { validateDTO } from "@AUTH/middlewares/validate-dto";

@Route("/api/v1")
@Tags("User")
export class UserController implements IUserController {
  constructor(private readonly userService: UserService) {}

  @Security("jwt", ["read:profile"])
  @Get(routePath.PROFILE)
  public async getProfile(
    @Request() req: RequestWithUser
  ): Promise<SuccessResponse<UserProfileDTO>> {
    console.log("hello")
    try {
      // const userId = (req as RequestWithUser).user?.userId as string;
      const { userId } = req.user!;
      console.log("hello");
      console.log("userID:", userId);

      const profile = await this.userService.getProfile(userId!);

      const userDto = new UserProfileDTO(
        profile.firstName,
        profile.lastName,
        profile.gender,
        profile.email
      );

      await validateOrReject(userDto);

      return new SuccessResponse(`${StatusCode.OK}`, "OK", userDto);
    } catch (error: unknown) {
      if (Array.isArray(error)) {
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

  @Success(StatusCode.Created, "OK")
  @Middlewares(validateDTO(UserUpdateDTO))
  @Security("jwt", ["read:profile", "write:profile"])
  @Put(routePath.UPDATE)
  public async updateProfile(
    @Request()
    req: Express.Request,
    @Body()
    user: Partial<IUpdateUser>
  ): Promise<SuccessResponse<UserProfileDTO>> {
    try {
      const userId = (req as RequestWithUser).user?.userId as string;

      const updatedUser = await this.userService.updateProfile(userId, user);

      const userDto = new UserProfileDTO(
        updatedUser?.firstName,
        updatedUser?.lastName,
        updatedUser?.gender,
        updatedUser?.email
      );

      await validateOrReject(userDto);

      return new SuccessResponse(`${StatusCode.Created}`, "OK", userDto);
    } catch (error: unknown) {
      if (Array.isArray(error)) {
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
}
