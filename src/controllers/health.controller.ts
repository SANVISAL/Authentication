import { HealthService } from "@CRUD_PG/services/health.service";
import { Get, Route, SuccessResponse as Success } from "tsoa";
import { SuccessResponse } from "@CRUD_PG/utils/response";
import Container from "typedi";
import { StatusCode } from "@CRUD_PG/utils/consts";

@Route("/api/v1")
export class HealthController {
  private readonly _heathService: HealthService;

  constructor() {
    this._heathService = Container.get(HealthService);
  }

  @Get("/health")
  @Success(StatusCode.OK, "OK")
  public async checkHealth(): Promise<SuccessResponse<{}>> {
    try {
      console.log("HI");
      const userHealth = await this._heathService.checkHealthUser();
      return new SuccessResponse("", "", { userHealth });
    } catch (error: unknown) {
      throw error;
    }
  }
}
