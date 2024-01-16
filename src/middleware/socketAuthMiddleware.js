const jwt = require('jsonwebtoken');

module.exports = (socket, next) => {
  try {
    const token = socket.handshake.query.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Assuming roles are in the token payload
    // INPUT_REQUIRED {Ensure token contains roles and add them to socket.user}
    socket.user = { ...decoded, roles: decoded.roles };
    next();
  } catch (error) {
    next(new Error('Authentication error'));
  }
};
