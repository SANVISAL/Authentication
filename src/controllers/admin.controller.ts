import { routePath } from "@AUTH/routes";
import { AdminService } from "@AUTH/services/admin.service";
import { SuccessResponse } from "@AUTH/utils/response";
import { Delete, Get, Path, Request, Route, Security, Tags } from "tsoa";
import { IAdminController } from "./@types/admin.controller";
import { UserProfileDTO } from "@AUTH/dto/user.dto";
import { validateOrReject, ValidationError } from "class-validator";
import { StatusCode } from "@AUTH/utils/consts";
import { formatValidationErrors } from "@AUTH/utils/validation";
import { logger } from "@AUTH/utils/logger";
import { ApiError } from "@AUTH/utils/api-error";
import { RequestWithUser } from "@AUTH/middlewares/authentication";

@Route("/api/v1")
@Tags("Admin")
export class AdminController implements IAdminController {
  constructor(private readonly adminService: AdminService) {}

  @Security("jwt", ["read:profile", "write:profile"])
  @Get(routePath.ALLUSER)
  public async getAllUsers(): Promise<SuccessResponse<UserProfileDTO[]>> {
    try {
      const users = await this.adminService.getAllUsers();

      return new SuccessResponse("", "", users);
    } catch (error) {
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

  @Security("jwt", ["read:profile", "write:profile"])
  @Get(routePath.GETBYID)
  public async getUser(
    @Path() userId: string,
    @Request() req: Express.Request
  ): Promise<SuccessResponse<UserProfileDTO>> {
    try {
      console.log((req as RequestWithUser).user?.userId);
      const user = await this.adminService.getUserById(userId);

      const userDto = new UserProfileDTO(
        user.firstName,
        user.lastName,
        user.gender,
        user.email
      );

      await validateOrReject(userDto);

      return new SuccessResponse(`${StatusCode.OK}`, "OK", userDto);
    } catch (error) {
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
  @Security("jwt", ["read:profile", "write:profile"])
  @Delete(routePath.DELETEBYID)
  public async deleteUser(userId: string): Promise<SuccessResponse<null>> {
    try {
      await this.adminService.deleteUser(userId);
      return new SuccessResponse("200", "OK", null);
    } catch (error) {
      throw error;
    }
  }
}
