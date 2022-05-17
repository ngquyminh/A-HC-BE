const connectDb = require("./config");
const server = require("./server");
require("dotenv/config");

connectDb();
server();
