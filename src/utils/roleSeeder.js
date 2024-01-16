const Role = require('../models/Role');

const initialRoles = ['Super Admin', 'Admin', 'Staff', 'Doctor', 'Patient'];

const roleSeeder = async () => {
  try {
    const roles = await Role.find({});
    if (roles.length >= initialRoles.length) {
      // console.log(roles)
      // console.log('Roles already exist in the database');
      return;
    }
    for (const roleName of initialRoles) {
      const roleExists = roles.some(role => role.name === roleName);
      if (!roleExists) {
        const newRole = new Role({ name: roleName });
        await newRole.save();
      }
    }

    console.log('Roles have been seeded.');
  } catch (error) {
    console.error('Error seeding roles:', error);
  }
};

module.exports = roleSeeder;
