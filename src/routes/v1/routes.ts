/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { TsoaRoute, fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
<<<<<<< HEAD
import { AuthController } from './../../controllers/auth.controller';
=======
import { HealthController } from './../../controllers/health.controller';
>>>>>>> db0fbe1e0affaeac8d1347219f9363e6721c166e
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';



// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
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
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {"noImplicitAdditionalProperties":"throw-on-extras","bodyCoercion":true});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa




export function RegisterRoutes(app: Router) {

    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################


    
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
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
