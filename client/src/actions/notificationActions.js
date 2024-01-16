export const appointmentCreated = (appointment) => {
  return {
    type: 'APPOINTMENT_CREATED_NOTIFICATION',
    payload: appointment,
  };
};

export const appointmentUpdated = (appointment) => {
  return {
    type: 'APPOINTMENT_UPDATED_NOTIFICATION',
    payload: appointment,
  };
};

export const appointmentDeleted = (appointmentId) => {
  return {
    type: 'APPOINTMENT_DELETED_NOTIFICATION',
    payload: appointmentId,
  };
};
