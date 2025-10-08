const connectDB = require('./config/db');
const app = require('./app');
const http = require('http');
connectDB();
const port = 3000;
const server = http.createServer(app);
server.listen(port, () => {
  console.log('server started at port ', port);
});
