import { HealthService } from "@AUTH/services/health.service";
import { Get, Route, Tags } from "tsoa";

@Route("/api/v1")
@Tags("Health")
export class HealthController {
  constructor(private readonly healthService: HealthService) {}
  @Get("/health")
  public async checkHealth() {
    try {
      const health = await this.healthService.getHealth();

      return health;
    } catch (error: unknown) {
      throw error;
    }
  }
}
