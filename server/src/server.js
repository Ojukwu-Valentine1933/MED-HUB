const http = require("http");
const app = require("./app");
const server = http.createServer(app);
const PORT = 3001;
const mongooseConnection = require("./config/mongoose");

const createServer = async () => {
  await mongooseConnection();
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
createServer();
