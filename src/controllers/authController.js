const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Role = require('../models/Role');

exports.register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({ message: 'Email already in use' });
    }

    const roleDocument = await Role.findOne({ name: role });
    if (!roleDocument) {
      return res.status(404).json({ message: 'Role not found' });
    }
    
    const user = new User({
      username,
      email,
      password,
      roles: [roleDocument._id],
    });
    await user.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering new user', error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).populate('roles');
    if (!user) {
      return res.status(404).json({ message: 'User does not exist' });
    }
    
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const payload = {
      id: user._id,
      roles: user.roles.map(role => role.name)
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Logged in successfully', token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};
