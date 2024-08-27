import { AdminService } from "@AUTH/services/admin.service";
import { SuccessResponse } from "@AUTH/utils/response";

export class AdminController {
  constructor(private readonly _adminService: AdminService) {}
  public async getAllUsers() {
    try {
      const users = await this._adminService.getAllUsers();
      return new SuccessResponse("", "", users);
    } catch (error) {
      throw error;
    }
  }

  public async getById(userId: string) {
    try {
      const user = await this._adminService.getUserById(userId);
      return new SuccessResponse("", "", user);
    } catch (error) {
      throw error;
    }
  }

  public async deleteUser(userId: string): Promise<SuccessResponse<null>> {
    try {
      await this._adminService.deleteUser(userId);
      return new SuccessResponse("200", "User deleted successfully", null);
    } catch (error) {
      throw error;
    }
  }
}
