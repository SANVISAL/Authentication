import { AuthController } from "@AUTH/controllers/auth.controller";
import { HealthController } from "@AUTH/controllers/health.controller";
import { AppDataSource } from "@AUTH/database/data-source";
import { Role } from "@AUTH/database/entities/role..entity";
import { Session } from "@AUTH/database/entities/session.entity";
import { UserRole } from "@AUTH/database/entities/user-role.entity";
import { User } from "@AUTH/database/entities/user.entity";
import { RoleRepository } from "@AUTH/database/repositories/role.repository";
import { SessionRepository } from "@AUTH/database/repositories/session.repository";
import { UserRoleRepository } from "@AUTH/database/repositories/user-role.repository";
import { UserRepository } from "@AUTH/database/repositories/user.repository";
import { AuthService } from "@AUTH/services/auth.service";
import { HealthService } from "@AUTH/services/health.service";

export class AppContainer {
  private static userRepository: UserRepository;
  private static roleRepository: RoleRepository;
  private static userRoleRepository: UserRoleRepository;
  private static sessionRepository: SessionRepository;
  private static healthService: HealthService;
  private static healthController: HealthController;
  private static authService: AuthService;
  private static authControler: AuthController;

  public static getUserRepository(): UserRepository {
    if (!this.userRepository) {
      this.userRepository = new UserRepository(
        AppDataSource.getInstance().getRepository(User)
      );
    }
    return this.userRepository;
  }

  public static getUserRoleRepository(): UserRoleRepository {
    if (!this.userRoleRepository) {
      this.userRoleRepository = new UserRoleRepository(
        AppDataSource.getInstance().getRepository(UserRole)
      );
    }
    return this.userRoleRepository;
  }

  public static getRoleRepository(): RoleRepository {
    if (!this.roleRepository) {
      this.roleRepository = new RoleRepository(
        AppDataSource.getInstance().getRepository(Role)
      );
    }
    return this.roleRepository;
  }

  public static getSessionRepository(): SessionRepository {
    if (!this.sessionRepository) {
      this.sessionRepository = new SessionRepository(
        AppDataSource.getInstance().getRepository(Session)
      );
    }
    return this.sessionRepository;
  }

  public static getHealthSerivce(): HealthService {
    if (!this.healthService) {
      this.healthService = new HealthService(this.getUserRepository());
    }
    return this.healthService;
  }

  public static getHealthController(): HealthController {
    if (!this.healthController) {
      this.healthController = new HealthController(this.getHealthSerivce());
    }

    return this.healthController;
  }

  public static getAuthService(): AuthService {
    if (!this.authService) {
      this.authService = new AuthService(
        this.getUserRepository(),
        this.getUserRoleRepository(),
        this.getRoleRepository(),
        this.getSessionRepository()
      );
    }
    return this.authService;
  }

  public static getAuthController(): AuthController {
    if (!this.authControler) {
      this.authControler = new AuthController(this.getAuthService());
    }
    return this.authControler;
  }
}
