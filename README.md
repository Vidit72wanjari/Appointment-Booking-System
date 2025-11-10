# Full Stack Auth Application

A complete authentication system built with React frontend and Node.js backend.

## Features

- User registration and login
- JWT authentication
- Protected routes
- Responsive UI

## Project Structure

```
fullstack-auth-app/
├── backend/
│   ├── package.json
│   ├── server.js
│   ├── .env
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   └── authRoutes.js
│   ├── controllers/
│   │   └── authController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   └── utils/
│       └── generateToken.js
├── frontend/
│   ├── package.json
│   ├── vite.config.js
│   ├── src/
│   │   ├── main.jsx
│   │   ├── App.jsx
│   │   ├── components/
│   │   │   └── ProtectedRoute.jsx
│   │   ├── pages/
│   │   │   ├── Signup.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Home.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   └── Context/
│   │       └── AuthContext.jsx
│   └── public/
│       └── index.html
└── # 🏥 Doctor Appointment Booking System

A modern, full-stack web application for booking medical appointments with professional UI/UX design and comprehensive features.

## ✨ Features

### 🎭 **Bollywood Celebrity Doctors**
- **Dr. Salman Khan** - Cardiology (₹2,500)
- **Dr. Shah Rukh Khan** - Dermatology (₹3,000)
- **Dr. Aamir Khan** - Orthopedics (₹3,500)
- **Dr. Akshay Kumar** - General Medicine (₹2,000)
- **Dr. Hrithik Roshan** - Neurology (₹4,000)
- **Dr. Ranveer Singh** - Pediatrics (₹2,200)

### 🎨 **Modern UI Features**
- **Glass-morphism Design** with gradient backgrounds
- **Professional Medical Theming** with hospital emojis
- **Responsive Layout** for all screen sizes
- **Smooth Animations** and hover effects
- **Indian Context** with rupee (₹) currency

### 🔐 **Authentication System**
- User registration and login
- JWT token-based authentication
- Protected routes
- Secure password hashing

### 📅 **Appointment Management**
- Browse available doctors
- Book appointments with preferred time slots
- View appointment history
- MongoDB persistence for all bookings
- Real-time appointment status

### 🏗️ **Technical Features**
- **Frontend**: React.js with Vite
- **Backend**: Node.js with Express.js
- **Database**: MongoDB Atlas
- **Styling**: Modern CSS with glass-morphism effects
- **API**: RESTful API design
- **Security**: JWT authentication, password hashing

## 🚀 Live Demo

Visit: `http://localhost:3001` (after setup)

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/Vidit72wanjari/Doctor-Appointment-Booking-System.git
cd Doctor-Appointment-Booking-System
```

### 2. Backend Setup
```bash
cd backend
npm install

# Create .env file with:
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/appointmentDB
JWT_SECRET=your-secret-key
NODE_ENV=development

# Start backend server
npm start
```

### 3. Frontend Setup
```bash
cd frontend
npm install

# Create .env file with:
VITE_API_URL=http://localhost:5000/api

# Start frontend development server
npm run dev
```

### 4. Access Application
- Frontend: `http://localhost:3001`
- Backend API: `http://localhost:5000`

## 🏗️ Project Structure

```
Doctor-Appointment-Booking-System/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   └── authController.js     # Authentication logic
│   ├── middleware/
│   │   └── authMiddleware.js     # JWT verification
│   ├── models/
│   │   ├── User.js               # User schema
│   │   ├── Doctor.js             # Doctor schema
│   │   └── Appointment.js        # Appointment schema
│   ├── routes/
│   │   └── authRoutes.js         # Authentication routes
│   ├── .env                      # Environment variables
│   ├── package.json
│   └── server.js                 # Main server file
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   └── ProtectedRoute.jsx
│   │   ├── Context/
│   │   │   └── AuthContext.jsx   # Authentication context
│   │   ├── pages/
│   │   │   ├── Home.jsx          # Landing page
│   │   │   ├── Login.jsx         # Login page
│   │   │   ├── Signup.jsx        # Registration page
│   │   │   ├── DoctorList.jsx    # Doctor browsing
│   │   │   ├── BookAppointment.jsx # Appointment booking
│   │   │   └── MyAppointments.jsx # Appointment history
│   │   ├── services/
│   │   │   └── api.js            # API service
│   │   ├── App.jsx               # Main app component
│   │   └── main.jsx              # Entry point
│   ├── .env                      # Environment variables
│   ├── package.json
│   └── vite.config.js            # Vite configuration
└── README.md
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login

### Doctors
- `GET /api/doctors` - Get all doctors
- `GET /api/doctors/:id` - Get doctor by ID

### Appointments
- `POST /api/appointments` - Book new appointment
- `GET /api/appointments/my` - Get user's appointments

## 🎨 UI Screenshots

### Login Page
- Modern glass-morphism design
- Medical branding with hospital emojis
- Smooth animations and responsive layout

### Doctor List
- Professional doctor cards with avatars
- Specialization tags and experience details
- Rupee pricing display

### Appointment Booking
- Detailed doctor information
- Date and time slot selection
- Consultation reason form

### My Appointments
- Comprehensive appointment history
- Doctor details with consultation fees
- Status tracking and appointment details

## 🔒 Security Features

- **Password Hashing**: bcryptjs for secure password storage
- **JWT Authentication**: Secure token-based authentication
- **Protected Routes**: Client-side route protection
- **Input Validation**: Comprehensive form validation
- **CORS Configuration**: Secure cross-origin requests

## 💻 Technology Stack

### Frontend
- **React.js** - Component-based UI library
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing
- **Axios** - HTTP client for API requests
- **CSS3** - Modern styling with glass-morphism

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing library

## 📱 Features in Detail

### 🎭 Bollywood Theme
- Celebrity doctor names for engaging user experience
- Indian cultural context with rupee currency
- Professional medical specializations

### 💎 Glass-Morphism UI
- Translucent backgrounds with backdrop blur
- Gradient color schemes
- Modern card-based layouts
- Smooth hover animations

### 📅 Smart Appointment System
- Real-time availability checking
- Multiple time slot options
- Detailed consultation forms
- Persistent appointment storage

## 🚀 Deployment

### Backend Deployment (Heroku/Railway)
1. Set environment variables
2. Configure MongoDB Atlas
3. Deploy backend service

### Frontend Deployment (Vercel/Netlify)
1. Build production bundle
2. Configure API base URL
3. Deploy static files

## 👨‍💻 Developer

**Vidit Wanjari**
- GitHub: [@Vidit72wanjari](https://github.com/Vidit72wanjari)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Bollywood celebrities for inspiration
- Modern UI/UX design trends
- Healthcare industry standards
- Open source community

---

⭐ **Star this repository if you found it helpful!**
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB

### Backend Setup
1. Navigate to backend folder:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create .env file with:
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

4. Start the server:
   ```
   npm start
   ```

### Frontend Setup
1. Navigate to frontend folder:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create .env file with:
   ```
   VITE_API_URL=http://localhost:5000/api
   ```

4. Start the development server:
   ```
   npm run dev
   ```

## Usage

1. Open browser and go to `http://localhost:3000`
2. Sign up with your credentials
3. Login to access the home page
4. Logout when done

## API Endpoints

- POST `/api/auth/signup` - User registration
- POST `/api/auth/login` - User login

## Technologies Used

- Frontend: React, Vite, React Router
- Backend: Node.js, Express, MongoDB, JWT
- Authentication: JSON Web Tokens
- Database: MongoDB Atlas