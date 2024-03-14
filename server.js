import express from "express";
import cors from "cors";
import http from "node:http";
import compression from "compression";
import { router } from "./routes/streamRoutes.js";
import apicache from "apicache";
const app = express();
const server = http.createServer(app);
const cache = apicache.middleware;

app.use(cors());
app.use(compression());
app.use(cache("5 minutes"));

app.use(express.urlencoded({ extended: false }));
app.use("/stream", router);

server.listen(3000, () => {
  console.log("server is running on port 3000");
});
