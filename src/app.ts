import express from "express";
import { ROUTE_PATH } from "./routes/routes-refer";
import route from "./routes/v1/route";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(ROUTE_PATH.BASE_PATH, route);

export default app;
