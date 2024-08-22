import { AuthController } from "@CRUD_PG/controllers/auth.controller";
import { HealthController } from "@CRUD_PG/controllers/health.controller";
import { AppDataSource } from "@CRUD_PG/database/data-source";
import { Role } from "@CRUD_PG/database/entities/role..entity";
import { Session } from "@CRUD_PG/database/entities/session.entity";
import { UserRole } from "@CRUD_PG/database/entities/user-role.entity";
import { User } from "@CRUD_PG/database/entities/user.entity";
import { RoleRepository } from "@CRUD_PG/database/repositories/role.repository";
import { SessionRepository } from "@CRUD_PG/database/repositories/session.repository";
import { UserRoleRepository } from "@CRUD_PG/database/repositories/user-role.repository";
import { UserRepository } from "@CRUD_PG/database/repositories/user.repository";
import { AuthService } from "@CRUD_PG/services/auth.service";
import { HealthService } from "@CRUD_PG/services/health.service";

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
