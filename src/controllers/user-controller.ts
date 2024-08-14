import { UserCreate } from "@project_name/database/repositories/@types/user-type-repo";
import UserService from "@project_name/services/user-service";

class UserController {
  constructor(private userservice: UserService) {
    // this.userservice = new UserService();
  }
  async userCreate(user: UserCreate) {
    try {
      const userCreate = await this.userservice.createUser(user);
      return userCreate;
    } catch (error) {
      throw error;
    }
  }

  async getAllUser() {
    try {
      const users = await this.userservice.getAllUser();
      return users;
    } catch (error) {
      throw error;
    }
  }
}

export default UserController;
