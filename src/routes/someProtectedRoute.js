const express = require('express');
const { requireAuth } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/superAdmin', requireAuth('Super Admin'), (req, res) => {
  res.json({ message: 'You have accessed the Super admin route.' });
});
router.get('/admin', requireAuth('Admin'), (req, res) => {
  res.json({ message: 'You have accessed the admin route.' });
});
router.get('/staff', requireAuth('Staff'), (req, res) => {
  res.json({ message: 'You have accessed the staff route.' });
});

router.get('/doctor', requireAuth('Doctor'), (req, res) => {
  res.json({ message: 'You have accessed the doctor route.' });
});

router.get('/patient', requireAuth('Patient'), (req, res) => {
  res.json({ message: 'You have accessed the patient route.' });
});

module.exports = router;

