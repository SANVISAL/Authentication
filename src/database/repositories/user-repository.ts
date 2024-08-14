// import AppDataSource from "..";
import User from "../models/model-user";
import { UserCreate, UserName } from "./@types/user-type-repo";
import { Repository } from "typeorm";

class UserRespository {
  private userRepository: Repository<User>;
  constructor(userRepository: Repository<User>) {
    this.userRepository = userRepository;
  }
  createUser(user: UserCreate) {
    try {
      const userCreate = this.userRepository.create(user);
      const saveUser = this.userRepository.save(userCreate);
      if (!saveUser) {
        throw new Error("Failed to save user");
      } else {
        return saveUser;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  findAllUsers() {
    try {
      const allUsers = this.userRepository.find();
      return allUsers;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  findUserByName(user: UserName) {
    try {
      const foundUser = this.userRepository.findOne({
        where: { firstName: user.firstName, lastName: user.lastName },
      });
      return foundUser || null;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default UserRespository;
