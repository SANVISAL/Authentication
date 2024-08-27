import { AuthController } from "@AUTH/controllers/auth.controller";
import { HealthController } from "@AUTH/controllers/health.controller";
import { UserController } from "@AUTH/controllers/user.controller";
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
import { UserService } from "@AUTH/services/user-service";

export class AppContainer {
  private static _userRepository: UserRepository;
  private static _roleRepository: RoleRepository;
  private static _userRoleRepository: UserRoleRepository;
  private static _sessionRepository: SessionRepository;
  private static _healthService: HealthService;
  private static _healthController: HealthController;
  private static _authService: AuthService;
  private static _authController: AuthController;
  private static _userService: UserService;
  private static _userController: UserController;

  public static getUserRepository(): UserRepository {
    if (!this._userRepository) {
      this._userRepository = new UserRepository(
        AppDataSource.getInstance().getRepository(User)
      );
    }
    return this._userRepository;
  }

  public static getUserRoleRepository(): UserRoleRepository {
    if (!this._userRoleRepository) {
      this._userRoleRepository = new UserRoleRepository(
        AppDataSource.getInstance().getRepository(UserRole)
      );
    }
    return this._userRoleRepository;
  }

  public static getRoleRepository(): RoleRepository {
    if (!this._roleRepository) {
      this._roleRepository = new RoleRepository(
        AppDataSource.getInstance().getRepository(Role)
      );
    }
    return this._roleRepository;
  }

  public static getSessionRepository(): SessionRepository {
    if (!this._sessionRepository) {
      this._sessionRepository = new SessionRepository(
        AppDataSource.getInstance().getRepository(Session)
      );
    }
    return this._sessionRepository;
  }

  public static getHealthService(): HealthService {
    if (!this._healthService) {
      this._healthService = new HealthService(this.getUserRepository());
    }
    return this._healthService;
  }

  public static getHealthController(): HealthController {
    if (!this._healthController) {
      this._healthController = new HealthController(this.getHealthService());
    }
    return this._healthController;
  }

  public static getAuthService(): AuthService {
    if (!this._authService) {
      this._authService = new AuthService(
        this.getUserRepository(),
        this.getUserRoleRepository(),
        this.getRoleRepository(),
        this.getSessionRepository()
      );
    }
    return this._authService;
  }

  public static getAuthController(): AuthController {
    if (!this._authController) {
      this._authController = new AuthController(this.getAuthService());
    }
    return this._authController;
  }
  public static getUserService(): UserService {
    if (!this._userService) {
      this._userService = new UserService(this.getUserRepository());
    }
    return this._userService;
  }
  public static getUserController(): UserController {
    if (!this._userController) {
      this._userController = new UserController();
    }
    return this._userController;
  }
}
