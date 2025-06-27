const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// الاتصال مع PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'final_mental',
  password: '0000',
  port: 5432,
});

// ==============================
// إرجاع كل المواعيد
app.get('/appointments', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM appointments ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching appointments' });
  }
});

// إضافة موعد جديد
app.post('/appointments', async (req, res) => {
  const { name, doctor, date, time } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO appointments (name, doctor, date, time) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, doctor, date, time]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error adding appointment' });
  }
});

// حذف موعد
app.delete('/appointments/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM appointments WHERE id = $1', [id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Error deleting appointment' });
  }
});

// تعديل موعد
app.put('/appointments/:id', async (req, res) => {
  const { id } = req.params;
  const { name, doctor, date, time } = req.body;
  try {
    const result = await pool.query(
      'UPDATE appointments SET name = $1, doctor = $2, date = $3, time = $4 WHERE id = $5 RETURNING *',
      [name, doctor, date, time, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error updating appointment' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
