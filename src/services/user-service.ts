import { UserCreate } from "@project_name/database/repositories/@types/user-type-repo";
import UserRespository from "@project_name/database/repositories/user-repository";

class UserService {
  constructor(private userRepository: UserRespository) {}
  async createUser(user: UserCreate) {
    try {
      const exsitedUser = await this.userRepository.findUserByName(user);
      if (exsitedUser) {
        throw new Error("User already exists");
      } else {
        const createdUser = this.userRepository.createUser(user);
        return createdUser;
      }
    } catch (error) {
      console.log("service:=:", error);
      throw error;
    }
  }
  async getAllUser() {
    try {
      const user = await this.userRepository.findAllUsers();
      if (!user) {
        throw new Error("No user found");
      }
      return user;
    } catch (error) {}
  }
}

export default UserService;
