const jwt = require('jsonwebtoken');
const User = require('../models/User');

const requireAuth = (roles = []) => {
  if (typeof roles === 'string') {
    roles = [roles];
  }

  return [
    (req, res, next) => {
      const tokenHeader = req.headers.authorization;
      if (!tokenHeader) {
        return res.status(401).json({ message: 'No token, authorization denied' });
      }

      try {
        const token = tokenHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
      } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
      }
    },
    async (req, res, next) => {
      try {
        const user = await User.findById(req.user.id);
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }

        const userRoles = (await user.populate('roles')).roles.map(role => role.name);


        const hasRequiredRole = roles.some(role => userRoles.includes(role));
        if (!hasRequiredRole) {
          return res.status(403).json({ message: 'Insufficient role' });
        }

        next();
      } catch (error) {
        res.status(500).json({ message: 'Error in role validation', error: error.message });
      }
    }
  ];
};

module.exports = { requireAuth };
