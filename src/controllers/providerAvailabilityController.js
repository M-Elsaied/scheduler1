const ProviderAvailability = require('../models/ProviderAvailability');

exports.createAvailability = async (req, res) => {
  try {
    const availability = new ProviderAvailability(req.body);
    await availability.save();
    res.status(201).json(availability);
  } catch (error) {
    res.status(400).json({ message: 'Error creating availability', error: error.message });
  }
};

exports.getAvailabilities = async (req, res) => {
  try {
    const availabilities = await ProviderAvailability.find().populate('provider');
    res.status(200).json(availabilities);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching availabilities', error: error.message });
  }
};

exports.getAvailability = async (req, res) => {
  try {
    const availability = await ProviderAvailability.findById(req.params.id).populate('provider');
    if (!availability) {
      return res.status(404).json({ message: 'Availability not found' });
    }
    res.status(200).json(availability);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching availability', error: error.message });
  }
};

exports.updateAvailability = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;
    const availability = await ProviderAvailability.findByIdAndUpdate(req.params.id, { startDate, endDate }, { new: true }).populate('provider');
    if (!availability) {
      return res.status(404).json({ message: 'Availability not found' });
    }
    res.status(200).json(availability);
  } catch (error) {
    res.status(400).json({ message: 'Error updating availability', error: error.message });
  }
};

exports.deleteAvailability = async (req, res) => {
  try {
    const availability = await ProviderAvailability.findByIdAndDelete(req.params.id);
    if (!availability) {
      return res.status(404).json({ message: 'Availability not found' });
    }
    res.status(200).json({ message: 'Availability deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting availability', error: error.message });
  }
};
