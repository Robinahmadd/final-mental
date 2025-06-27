import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AppointmentsPage from './pages/AppointmentsPage';
import AddAppointmentPage from './pages/AddAppointmentPage';
import EditAppointmentPage from './pages/EditAppointmentPage';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/appointments">Appointments</Link>
          <Link to="/add">Add Appointment</Link>
        </nav>

        <Routes>
          <Route path="/appointments" element={<AppointmentsPage />} />
          <Route path="/add" element={<AddAppointmentPage />} />
          <Route path="/edit/:id" element={<EditAppointmentPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
