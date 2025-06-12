import swaggerJSDoc from "swagger-jsdoc";
import __dirname from "../../utils.js";

const config = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "PRACTICA INTEGRADORA API",
      description: "DOCUMENATION DE LA API INTEGRADORA",
    },
  },
  apis: [__dirname + "/src/docs/*.doc.yaml"],
};

const swaggerSpec = swaggerJSDoc(config);
export default swaggerSpec;
