const { getIo } = require('../socket');

// Function to check if user has a specific role
const userHasRole = (userRoles, rolesToCheck) => {
  return rolesToCheck.some(role => userRoles.includes(role));
};

// Emit event to users with specified roles
const emitToRoles = (eventName, data, roles) => {
  const io = getIo();
  const sockets = io.of('/').sockets;

  for (let [id, socket] of sockets) {
    if (socket.user && userHasRole(socket.user.roles, roles)) {
      socket.emit(eventName, data);
    }
  }
};

module.exports = {
  emitToRoles
};
