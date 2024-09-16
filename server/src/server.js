const http = require("http");
const app = require("./app");
const server = http.createServer(app);
// const PORT = 3001;
const {PORT} = require("./config/dotEnv")
const mongooseConnection = require("./config/mongoose");

const startServer = async () => {
  await mongooseConnection();
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
startServer();
