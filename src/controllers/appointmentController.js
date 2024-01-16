const Appointment = require('../models/Appointment');
const { emitToRoles } = require('../utils/socketHandler');

exports.createAppointment = async (req, res) => {
  try {
    const appointment = new Appointment(req.body);
    await appointment.save();

    emitToRoles('appointmentCreated', appointment, ['Super Admin', 'Admin']);
    res.status(201).json(appointment);
  } catch (error) {
    res.status(400).json({ message: 'Error creating appointment', error: error.message });
  }
};

exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().populate('patient provider');
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching appointments', error: error.message });
  }
};

exports.getAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id).populate('patient provider');
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching appointment', error: error.message });
  }
};

exports.updateAppointment = async (req, res) => {
  try {
    const { status, startTime, endTime } = req.body;
    const appointment = await Appointment.findByIdAndUpdate(req.params.id, { status, startTime, endTime }, { new: true }).populate('patient provider');
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.status(200).json(appointment);
    emitToRoles('appointmentUpdated', appointment, ['Super Admin', 'Admin']);
  } catch (error) {
    res.status(400).json({ message: 'Error updating appointment', error: error.message });
  }
};

exports.deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.status(200).json({ message: 'Appointment deleted successfully' });
    emitToRoles('appointmentDeleted', { id: req.params.id }, ['Super Admin', 'Admin']);
  } catch (error) {
    res.status(500).json({ message: 'Error deleting appointment', error: error.message });
  }
};
