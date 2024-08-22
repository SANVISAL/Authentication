// import { HealthService } from "@CRUD_PG/services/health.service";
// import Container from "typedi";
import { Get, Route, SuccessResponse as Success } from "tsoa";
import { StatusCode } from "@CRUD_PG/utils/consts";

@Route("/api/v1")
export class HealthController {
  // private readonly _heathService: HealthService;

  constructor() {
    // this._heathService = Container.get(HealthService);
  }

  @Get("/health")
  @Success(StatusCode.OK, "OK")
  public async checkHealth() {
    try {
      return "HI";
    } catch (error: unknown) {
      throw error;
    }
  }
}
