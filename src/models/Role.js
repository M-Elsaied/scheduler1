const mongoose = require('mongoose');
console.log('Role model defined successfully.');

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
});

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;
