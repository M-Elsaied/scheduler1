const express = require('express');
const {
  createAvailability,
  getAvailabilities,
  getAvailability,
  updateAvailability,
  deleteAvailability
} = require('../controllers/providerAvailabilityController');
const { requireAuth } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', requireAuth(['Super Admin', 'Admin', 'Staff', 'Doctor']), createAvailability);
router.get('/', requireAuth(['Super Admin', 'Admin', 'Staff', 'Doctor']), getAvailabilities);
router.get('/:id', requireAuth(['Super Admin', 'Admin', 'Staff', 'Doctor']), getAvailability);
router.put('/:id', requireAuth(['Super Admin', 'Admin', 'Staff', 'Doctor']), updateAvailability);
router.delete('/:id', requireAuth(['Super Admin', 'Admin', 'Staff', 'Doctor']), deleteAvailability);

module.exports = router;
