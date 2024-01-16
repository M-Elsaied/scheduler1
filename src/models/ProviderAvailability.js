const mongoose = require('mongoose');

const providerAvailabilitySchema = new mongoose.Schema({
  provider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('ProviderAvailability', providerAvailabilitySchema);
