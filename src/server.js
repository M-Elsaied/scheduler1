const app = require('./app');
const http = require('http');
const server = http.createServer(app);
const { initializeIo } = require('./socket');

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

initializeIo(server);

const { Server } = require('socket.io');
const io = new Server(server);
const socketAuthMiddleware = require('./middleware/socketAuthMiddleware');

module.exports.io = io;

io.use(socketAuthMiddleware);

io.on('connection', (socket) => {
  console.log('a user connected with id:', socket.id);
  // You may want to perform role-based initialization or join specific rooms based on user roles here.
  // This can be used to emit to the specific user at a later stage.
  socket.on('disconnect', () => {
    console.log(`User with id ${socket.id} disconnected`);
  });
});
