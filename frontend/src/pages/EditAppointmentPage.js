import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditAppointmentPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/appointments')
      .then(res => res.json())
      .then(data => {
        const found = data.find(app => app.id === parseInt(id));
        if (found) setAppointment(found);
        else setMessage('Appointment not found');
      });
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/appointments/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(appointment),
    })
      .then(() => {
        setMessage('Appointment updated successfully!');
        setTimeout(() => navigate('/appointments'), 1500);
      })
      .catch(() => setMessage('Failed to update appointment'));
  };

  if (!appointment) return <p>Loading...</p>;

  return (
    <div className="app-container">
      <form onSubmit={handleUpdate}>
        <h2>Edit Appointment</h2>
        <input
          type="text"
          value={appointment.name}
          onChange={(e) => setAppointment({ ...appointment, name: e.target.value })}
          placeholder="Client name"
        />
        <select
          value={appointment.doctor}
          onChange={(e) => setAppointment({ ...appointment, doctor: e.target.value })}
        >
          <option value="">Select a doctor</option>
          <option value="Dr. Sarah Johnson">Dr. Sarah Johnson</option>
          <option value="Dr. Ahmed Ali">Dr. Ahmed Ali</option>
          <option value="Dr. Lina Kamal">Dr. Lina Kamal</option>
        </select>
        <input
          type="date"
          value={appointment.date}
          onChange={(e) => setAppointment({ ...appointment, date: e.target.value })}
        />
        <select
          value={appointment.time}
          onChange={(e) => setAppointment({ ...appointment, time: e.target.value })}
        >
          <option value="">Select a time</option>
          <option value="10:00 AM">10:00 AM</option>
          <option value="2:00 PM">2:00 PM</option>
          <option value="5:00 PM">5:00 PM</option>
        </select>
        <button type="submit">Update Appointment</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
}

export default EditAppointmentPage;
