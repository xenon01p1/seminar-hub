import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "Seminar API",
    description: "Documentation",
  },
  host: "localhost:3000",
  schemes: ["http"],
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./routes/admin.routes.js", "./routes/user.routes.js", "./routes/auth.routes.js"];

swaggerAutogen()(outputFile, endpointsFiles, doc);
