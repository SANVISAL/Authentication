import { ObjectLiteral } from "typeorm";

export interface UpdatedResult {
  affected?: number;
  generatedMaps: ObjectLiteral[];
  raw: any;
}
