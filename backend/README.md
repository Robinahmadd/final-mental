This is the **backend** for the mental health consultation booking system. It provides APIs to manage users and appointments using a local JSON file.

## 🔧 Tech Stack

- Node.js + Express  
- CORS  
- File System (fs)  
- JSON file for data storage

## 🚀 Getting Started

```bash
cd backend
npm install
node server.js


📁 Project Structure
backend/
├── appointments.json   # stores all appointment data
├── server.js           # Express server handling routes
├── package.json


🔗 API Endpoints

| Method | Endpoint           | Description            |
| ------ | ------------------ | ---------------------- |
| GET    | /appointments      | Get all appointments   |
| POST   | /appointments      | Create new appointment |
| PUT    | /appointments/\:id | Update appointment     |
| DELETE | /appointments/\:id | Delete appointment     |


The server will run on: http://localhost:5000