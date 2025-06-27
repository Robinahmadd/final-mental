import React, { useState } from 'react';

function AddAppointmentPage() {
  const [name, setName] = useState('');
  const [doctor, setDoctor] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [message, setMessage] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    const newAppointment = { name, doctor, date, time };

    fetch('http://localhost:5000/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newAppointment),
    })
      .then(() => {
        setMessage('Appointment added successfully!');
        setName('');
        setDoctor('');
        setDate('');
        setTime('');
      })
      .catch(() => setMessage('Error adding appointment.'));
  };

  return (
    <div className="app-container">
      <form onSubmit={handleAdd}>
        <h2>Add New Appointment</h2>
        <input
          type="text"
          placeholder="Client name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <select value={doctor} onChange={(e) => setDoctor(e.target.value)} required>
          <option value="">Select a doctor</option>
          <option value="Dr. Sarah Johnson">Dr. Sarah Johnson</option>
          <option value="Dr. Ahmed Ali">Dr. Ahmed Ali</option>
          <option value="Dr. Lina Kamal">Dr. Lina Kamal</option>
        </select>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <select value={time} onChange={(e) => setTime(e.target.value)} required>
          <option value="">Select a time</option>
          <option value="10:00 AM">10:00 AM</option>
          <option value="2:00 PM">2:00 PM</option>
          <option value="5:00 PM">5:00 PM</option>
        </select>
        <button type="submit">Add Appointment</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
}

export default AddAppointmentPage;
