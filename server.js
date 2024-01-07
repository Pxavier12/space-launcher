import express from "express";
import bodyParser from "body-parser";
import { db } from "./src/repository/db.js";
import cors from "cors";
import http from "http";
import multer from "multer";
import * as swaggerUI from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { usersRouter } from "./src/routes/routers/users-router.js";
import { argv } from "process";
import roverRouter from "./src/routes/routers/rover-router.js";
import missionRouter from "./src/routes/routers/mission-router.js";
const app = express();
const Http = http.Server(app);

app.use(cors()); //
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const server = Http.listen(3000, () => {
  console.log(
    "Server is now listening on port : ",
    server.address().port,
    " 🚀 ✅"
  );
});

//connect to db
db("spaceLauncher");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Space Launcher API",
      version: "1.0.0",
      description: "Space Launcher Express - API",
    },
    servers: [
      {
        url: "http://localhost:3000/api",
      },
    ],
  },
  apis: ["./src/routes/routers/*.js"],
};

const specs = swaggerJSDoc(swaggerOptions);

app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(specs));

app.use("/api", usersRouter);
app.use("/api", roverRouter);
app.use("/api", missionRouter);

export default app;
