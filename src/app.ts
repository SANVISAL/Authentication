import compression from "compression";
import express, { Application, NextFunction, Request, Response } from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import { getConfig } from "./utils/cofig";
import { StatusCode } from "./utils/consts";
import { logger } from "./utils/logger";
import { ErrorResponse } from "./utils/response";
import { exceptionHandler } from "./middlewares/exception-handler";
import swaggerUi from "swagger-ui-express";
import path from "path";
import { ipWhitelist } from "./middlewares/ip-whitelist";
import { RegisterRoutes } from "./routes/v1/routes";

const app: Application = express();
const config = getConfig();

// Security: Set various HTTP headers to help protect the app
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
      },
    },
    referrerPolicy: { policy: "no-referrer" },
    xssFilter: true,
    noSniff: true,
    hidePoweredBy: true,
    frameguard: { action: "deny" },
  })
);

// CORS: Allow cross-origin requests
app.use(
  cors({
    origin: config.env !== "development" ? "https://your-domain.com" : "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    maxAge: 600,
  })
);

// IP Address protector
app.use(ipWhitelist(["::1", "::ffff:127.0.0.1"]));

// authenticate API keys
// app.use(authenticate);

// Logging: Log HTTP requests
app.use(morgan("combined"));

// Compression: Compress response bodies
app.use(compression());

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(generalLimiter);

// Body parser: Parse incoming request bodies in JSON format, with a limit of 10mb
app.use(
  express.json({
    limit: "10mb",
  })
);
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

//api routes here

RegisterRoutes(app);

// Serve the Swagger UI
app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "/swagger.json", // Point to the generated Swagger JSON file
    },
  })
);

// Serve the generated Swagger JSON file
app.get("/swagger.json", (_req, res) => {
  res.sendFile(path.join(__dirname, "../public/swagger.json"));
});
// Catching invalid routes
app.use("*", (req: Request, res: Response, _next: NextFunction) => {
  const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
  logger.error(`${fullUrl} endpoint does not exist`);
  res
    .status(StatusCode.NotFound)
    .json(
      new ErrorResponse(
        `${StatusCode.NotFound}`,
        "The endpoint called does not exist."
      )
    );
});

//exception handler
app.use(exceptionHandler);

export default app;
