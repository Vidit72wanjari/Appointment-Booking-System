# 🏥 Appointment Booking System

A full-stack web application for managing medical appointments built with React.js and Node.js.

## ✨ Features

- **User Authentication**: Secure signup and login functionality
- **Doctor Management**: Browse available doctors and their specializations
- **Appointment Booking**: Schedule appointments with preferred doctors
- **My Appointments**: View and manage your booked appointments
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Updates**: Dynamic appointment status tracking

## 🚀 Tech Stack

### Frontend
- **React.js** - User interface
- **React Router** - Navigation
- **Axios** - API calls
- **Context API** - State management
- **CSS3** - Styling
- **Vite** - Development server

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB installation
- Git

### Clone the repository
```bash
git clone https://github.com/Vidit72wanjari/Appointment-Booking-System.git
cd Appointment-Booking-System
```

### Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

Start the backend server:
```bash
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
```

Start the frontend development server:
```bash
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3001
- Backend: http://localhost:5000

## 🗂️ Project Structure

```
Appointment-Booking-System/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── appointmentController.js
│   │   ├── authController.js
│   │   └── doctorController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── Appointment.js
│   │   ├── Doctor.js
│   │   └── User.js
│   ├── routes/
│   │   ├── appointmentRoutes.js
│   │   ├── authRoutes.js
│   │   └── doctorRoutes.js
│   ├── utils/
│   │   ├── generateToken.js
│   │   └── seedDoctors.js
│   ├── .env
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   └── ProtectedRoute.jsx
│   │   ├── Context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── BookAppointment.jsx
│   │   │   ├── DoctorList.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── MyAppointments.jsx
│   │   │   └── Signup.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - User login

### Doctors
- `GET /api/doctors` - Get all doctors
- `GET /api/doctors/:id` - Get doctor by ID

### Appointments
- `POST /api/appointments` - Book new appointment
- `GET /api/appointments/my-appointments` - Get user's appointments

## 🎯 Usage

1. **Sign Up**: Create a new account with your details
2. **Login**: Access your account with email and password
3. **Browse Doctors**: View available doctors and their specializations
4. **Book Appointment**: Select a doctor and choose your preferred date/time
5. **Manage Appointments**: View your upcoming appointments

## 🔒 Security Features

- Password hashing with bcryptjs
- JWT token-based authentication
- Protected routes on both frontend and backend
- Input validation and sanitization
- CORS configuration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 📧 Contact

**Vidit Wanjari**
- GitHub: [@Vidit72wanjari](https://github.com/Vidit72wanjari)
- Email: your-email@example.com

## 🙏 Acknowledgments

- Thanks to all the open-source libraries that made this project possible
- Special thanks to the React.js and Node.js communities

---

⭐ Don't forget to star this repository if you found it helpful!