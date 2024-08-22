/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import {
  TsoaRoute,
  fetchMiddlewares,
  ExpressTemplateService,
} from "@tsoa/runtime";
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
<<<<<<< HEAD
<<<<<<< HEAD
import { AuthController } from './../../controllers/auth.controller';
=======
import { HealthController } from './../../controllers/health.controller';
>>>>>>> db0fbe1e0affaeac8d1347219f9363e6721c166e
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';


=======
import { HealthController } from "./../../controllers/health.controller";
import type {
  Request as ExRequest,
  Response as ExResponse,
  RequestHandler,
  Router,
} from "express";
import { AppContainer } from "@CRUD_PG/di/app-container";
>>>>>>> 209dcf86d55cc0ec0b75fa19bb00c38ebe59c93b

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
<<<<<<< HEAD
<<<<<<< HEAD
    "SuccessResponse_string_": {
=======
    "SuccessResponse____": {
>>>>>>> db0fbe1e0affaeac8d1347219f9363e6721c166e
        "dataType": "refObject",
        "properties": {
            "code": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[""]}],"required":true},
            "message": {"dataType":"string","required":true},
<<<<<<< HEAD
            "result": {"dataType":"string","required":true},
=======
            "result": {"dataType":"nestedObjectLiteral","nestedProperties":{},"required":true},
>>>>>>> db0fbe1e0affaeac8d1347219f9363e6721c166e
        },
        "additionalProperties": false,
=======
  Gender: {
    dataType: "refEnum",
    enums: ["male", "female", "other", "unknown"],
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  User: {
    dataType: "refObject",
    properties: {
      id: { dataType: "string", required: true },
      firstName: { dataType: "string", required: true },
      lastName: { dataType: "string", required: true },
      email: { dataType: "string", required: true },
      password: { dataType: "string", required: true },
      gender: { ref: "Gender", default: "unknown" },
      isDeleted: { dataType: "boolean", default: false },
      createdAt: { dataType: "datetime", required: true },
      updatedAt: { dataType: "datetime", required: true },
      sesssion: {
        dataType: "array",
        array: { dataType: "refObject", ref: "Session" },
        required: true,
      },
      userRoles: {
        dataType: "array",
        array: { dataType: "refObject", ref: "UserRole" },
        required: true,
      },
>>>>>>> 209dcf86d55cc0ec0b75fa19bb00c38ebe59c93b
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  Session: {
    dataType: "refObject",
    properties: {
      id: { dataType: "string", required: true },
      user: { ref: "User", required: true },
      token: { dataType: "string", required: true },
      expireAt: { dataType: "datetime", required: true },
      isDeleted: { dataType: "boolean", default: false },
      createdAt: { dataType: "datetime", required: true },
      updatedAt: { dataType: "datetime", required: true },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  Roles: {
    dataType: "refEnum",
    enums: ["user", "admin", "super_admin"],
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  UserRole: {
    dataType: "refObject",
    properties: {
      userId: { dataType: "string", required: true },
      roleId: { dataType: "string", required: true },
      user: { ref: "User", required: true },
      role: { ref: "Role", required: true },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  Role: {
    dataType: "refObject",
    properties: {
      id: { dataType: "string", required: true },
      name: { ref: "Roles", default: "user" },
      description: { dataType: "string" },
      userRoles: {
        dataType: "array",
        array: { dataType: "refObject", ref: "UserRole" },
        required: true,
      },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {
  noImplicitAdditionalProperties: "throw-on-extras",
  bodyCoercion: true,
});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes(app: Router) {
  // ###########################################################################################################
  //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
  //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
  // ###########################################################################################################

  app.get(
    "/api/v1/health",
    ...fetchMiddlewares<RequestHandler>(HealthController),
    ...fetchMiddlewares<RequestHandler>(HealthController.prototype.checkHealth),

    async function HealthController_checkHealth(
      request: ExRequest,
      response: ExResponse,
      next: any
    ) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {};

<<<<<<< HEAD
    
<<<<<<< HEAD
        app.get('/api/v1/users',
            ...(fetchMiddlewares<RequestHandler>(AuthController)),
            ...(fetchMiddlewares<RequestHandler>(AuthController.prototype.getAllUsers)),

            async function AuthController_getAllUsers(request: ExRequest, response: ExResponse, next: any) {
=======
        app.get('/api/v1/health',
            ...(fetchMiddlewares<RequestHandler>(HealthController)),
            ...(fetchMiddlewares<RequestHandler>(HealthController.prototype.checkHealth)),

            async function HealthController_checkHealth(request: ExRequest, response: ExResponse, next: any) {
>>>>>>> db0fbe1e0affaeac8d1347219f9363e6721c166e
            const args: Record<string, TsoaRoute.ParameterSchema> = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

<<<<<<< HEAD
                const controller = new AuthController();

              await templateService.apiHandler({
                methodName: 'getAllUsers',
=======
                const controller = new HealthController();

              await templateService.apiHandler({
                methodName: 'checkHealth',
>>>>>>> db0fbe1e0affaeac8d1347219f9363e6721c166e
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
=======
      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({
          args,
          request,
          response,
>>>>>>> 209dcf86d55cc0ec0b75fa19bb00c38ebe59c93b
        });

        const controller = AppContainer.getHealthController();

        await templateService.apiHandler({
          methodName: "checkHealth",
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        console.log(err);
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
