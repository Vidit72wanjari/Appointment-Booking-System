# Doctor Appointment Booking System

A full-stack web application for booking doctor appointments with user authentication, doctor listings, and appointment management.

## 🚀 Features

- **User Authentication** - Signup and login with JWT tokens
- **Doctor Listings** - Browse doctors by specialization, location, and ratings
- **Appointment Booking** - Schedule appointments with date/time selection
- **Appointment Management** - View and manage your booked appointments
- **Responsive Design** - Works on desktop and mobile devices

## 🛠️ Technology Stack

- **Frontend**: React.js, Vite, React Router, Axios
- **Backend**: Node.js/Express (development), Vercel Serverless Functions (production)
- **Database**: MongoDB Atlas
- **Authentication**: JWT (JSON Web Tokens)
- **Deployment**: Vercel

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB Atlas account
- Git

## 🏃‍♂️ Running Locally

### Option 1: Full Development Setup (Recommended)

1. **Clone the repository**
   ```bash
   git clone https://github.com/Vidit72wanjari/Appointment-Booking-System.git
   cd Appointment-Booking-System
   ```

2. **Install dependencies**
   ```bash
   npm install
   cd frontend && npm install && cd ..
   ```

3. **Start development servers**
   ```bash
   npm run dev
   ```

   This will start:
   - API server on `http://localhost:5001`
   - Frontend on `http://localhost:3001`

### Option 2: Frontend Only (Uses production API)

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start frontend**
   ```bash
   npm run dev
   ```

## 🌐 Deployment

### Vercel (Recommended)

1. **Fork/Clone this repository to your GitHub account**

2. **Go to [Vercel](https://vercel.com) and sign in with GitHub**

3. **Import your repository**
   - Click "New Project"
   - Select your repository
   - Choose "Frontend" as the root directory

4. **Configure build settings**
   - Framework Preset: Vite
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`

5. **Deploy**
   - Click "Deploy"
   - Your app will be available at `https://your-project.vercel.app`

### GitHub Pages

1. **Enable GitHub Actions**
   ```bash
   # Create .github/workflows/deploy.yml (already included)
   ```

2. **Push to main branch**
   ```bash
   git push origin main
   ```

3. **Enable GitHub Pages**
   - Go to repository Settings
   - Scroll to Pages section
   - Source: GitHub Actions

## 📱 Usage

1. **Visit the application** at `http://localhost:3001` (development) or your deployed URL

2. **Create an account**
   - Click "Sign Up"
   - Enter name, email, and password
   - Click "Create Account"

3. **Browse doctors**
   - View available doctors
   - Check their specializations and ratings
   - Click "Book Appointment" for your preferred doctor

4. **Book an appointment**
   - Select date and time
   - Describe your symptoms
   - Confirm booking

5. **Manage appointments**
   - Go to "My Appointments"
   - View all your scheduled appointments
   - Check appointment status

## 🔧 Development

### Project Structure
```
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── Context/        # React context (Auth)
│   │   └── services/       # API services
│   └── api/                # Vercel serverless functions
├── dev-server.js           # Development API server
└── package.json           # Root package configuration
```

### Environment Variables

**Development** (`.env`):
```
VITE_API_URL=http://localhost:5001/api
```

**Production** (`.env.production`):
```
VITE_API_URL=/api
```

### API Endpoints

- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User authentication
- `GET /api/doctors` - Get all doctors
- `GET /api/doctors/:id` - Get specific doctor
- `POST /api/appointments` - Create appointment (authenticated)
- `GET /api/appointments/my-appointments` - Get user appointments (authenticated)

## 🐛 Troubleshooting

### Common Issues

1. **Blank page after startup**
   - Check if both servers are running (API on 5001, Frontend on 3001)
   - Check browser console for errors
   - Verify environment variables

2. **API connection errors**
   - Ensure MongoDB Atlas connection string is correct
   - Check if development server is running
   - Verify CORS settings

3. **Authentication issues**
   - Clear localStorage: `localStorage.clear()`
   - Check JWT token validity
   - Verify API endpoints

### Development Commands

```bash
# Start both servers
npm run dev

# Start only API server
npm run dev:api

# Start only frontend
npm run dev:frontend

# Build for production
npm run build

# Preview production build
npm run start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📧 Support

If you encounter any issues or have questions, please:
1. Check the troubleshooting section
2. Review the console logs
3. Create an issue in the repository

---

**Happy coding! 🎉**