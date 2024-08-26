import { UserRepository } from "@AUTH/database/repositories/user.repository";

export class HealthService {
  constructor(private userRepository: UserRepository) {}

  public async getHealth() {
    try {
      const user = await this.userRepository.findAll();

      return user;
    } catch (error: unknown) {
      throw error;
    }
  }
}
