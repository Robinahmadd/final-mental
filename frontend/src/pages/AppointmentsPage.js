import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);

  // Load appointments
  useEffect(() => {
    fetch('http://localhost:5000/appointments')
      .then(res => res.json())
      .then(data => {
        console.log('Fetched appointments:', data);
        // تأكد إنو الداتا عبارة عن Array، وإذا مش هيك، خليه Array فاضي
        if (Array.isArray(data)) {
          setAppointments(data);
        } else {
          console.warn('Unexpected data format:', data);
          setAppointments([]);
        }
      })
      .catch(err => {
        console.error('Error loading data', err);
        setAppointments([]);
      });
  }, []);

  // Delete appointment
  const deleteAppointment = (id) => {
    fetch(`http://localhost:5000/appointments/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setAppointments(prev => prev.filter(a => a.id !== id));
      })
      .catch(err => console.error('Failed to delete', err));
  };

  return (
    <div>
      <h2>Booked Appointments</h2>
      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <ul>
          {appointments.map(app => (
            <li key={app.id}>
              🧠 <strong>{app.name}</strong> with <strong>{app.doctor}</strong> <br />
              📅 {app.date} - 🕒 {app.time}
              <br />
              <button onClick={() => deleteAppointment(app.id)}>❌ Delete</button>
              <Link to={`/edit/${app.id}`} style={{ marginLeft: '10px' }}>✏️ Edit</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AppointmentsPage;
