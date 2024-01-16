const { Server } = require('socket.io');

let ioInstance;

const initializeIo = (server) => {
  ioInstance = new Server(server);
  ioInstance.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
};

const getIo = () => {
  if (!ioInstance) {
    throw new Error('Socket.io not initialized');
  }
  return ioInstance;
};

module.exports = {
  initializeIo,
  getIo
};
