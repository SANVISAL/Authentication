import { SuccessResponse } from "@AUTH/utils/response";

import { Get, Route, Security, Tags, Request } from "tsoa";
import { routePath } from "@AUTH/routes";
import { RequestWithUser } from "@AUTH/middlewares/authentication";

@Route("/users")
@Tags("User")
export class UserController {
  constructor() {}

  @Security("jwt", ["read:profile"])
  @Get(routePath.PROFILE)
  public async getProfile(@Request() req: Express.Request) {
    try {
      return new SuccessResponse("", "", (req as RequestWithUser).user);
    } catch (error) {
      throw error;
    }
  }
  // @Get(routePath.UPDATE)
  // public async updateProfile(@Path() userId: string, updatedUser: any) {
  //   try {
  //     const updatedProfile = await this.userService.updateProfile(
  //       userId,
  //       updatedUser
  //     );
  //     return new SuccessResponse("", "", updatedProfile);
  //   } catch (error) {
  //     throw error;
  //   }
  // }
}
