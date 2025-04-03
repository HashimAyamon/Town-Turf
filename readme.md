# 🚀 Town Turf

Turf Booking System is a full-stack web application built using the MERN (MongoDB, Express, React, Node.js) stack. This platform allows users to book turf slots and manage their reservations, while admins can manage turfs, bookings, and users through a dedicated dashboard.

![Football](https://plus.unsplash.com/premium_photo-1684888476748-204a96ac0ee3?w=500&auto=format&fit=crop&q=60)


### User Features

- User authentication (Register/Login)
- Browse available turfs
- Select date and time slots for booking
- View booking history
- Etc

### Admin Features

- Admin authentication
- Dashboard for managing turfs and bookings
- Add, edit, or delete turf details
- Manage user bookings
- Etc

## 🛠️ Tech Stack

### Frontend:

- ⚛️ React.js (with Redux/Context API)
- 🎨 Tailwind CSS / Bootstrap
- ⚙️ Axios for API calls

### Backend:

- 🖥️ Node.js + Express.js
- 🗄️ MongoDB (with Mongoose)
- 🔒 JWT Authentication

## Installation

### Prerequisites

Ensure you have the following installed:

- Node.js
- MongoDB (local or cloud)

### Setup

1. Clone the repository:

   ```sh
   git clone https://github.com/HashimAyamon/Town-Turf
   cd Town-Turf

   cd backend
   npm install
   ```

.env (inside the backend folder):
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

cd frontend
npm install
npm run both
