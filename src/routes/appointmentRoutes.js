const express = require('express');
const {
  createAppointment,
  getAppointments,
  getAppointment,
  updateAppointment,
  deleteAppointment,
  searchAppointments
} = require('../controllers/appointmentController');
const { requireAuth } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', requireAuth(['Super Admin','Admin', 'Staff']), createAppointment);
router.get('/search', requireAuth(['Super Admin', 'Admin', 'Staff', 'Doctor']), searchAppointments); // Move this line up
router.get('/', requireAuth(['Super Admin', 'Admin', 'Staff', 'Doctor', 'Patient']), getAppointments);
router.get('/:id', requireAuth(['Super Admin', 'Admin', 'Staff', 'Doctor', 'Patient']), getAppointment); // Moved down
router.put('/:id', requireAuth(['Super Admin', 'Admin', 'Staff']), updateAppointment);
router.delete('/:id', requireAuth(['Super Admin', 'Admin', 'Staff']), deleteAppointment);

module.exports = router;
