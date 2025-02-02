import swaggerJsdoc from "swagger-jsdoc";
import { PORT } from "./constants";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Magnus Backend",
      version: "1.0.0",
      description: "API documentation for my Magnus Backend",
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: "Local server",
      },
    ],
  },
  apis: ["./src/routes/**/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
