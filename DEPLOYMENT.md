# 🚀 Deployment Guide

## Quick Deploy Options

### Option 1: Vercel (Recommended - Free & Easy)

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy your app:**
   ```bash
   vercel --prod
   ```

4. **Follow the prompts:**
   - Link to existing project? `N`
   - Project name: `appointment-booking-system`
   - Directory: `./` (current directory)

### Option 2: Netlify + Railway

#### Frontend on Netlify:
1. Go to [Netlify](https://netlify.com)
2. Connect your GitHub repository
3. Build command: `cd frontend && npm run build`
4. Publish directory: `frontend/dist`

#### Backend on Railway:
1. Go to [Railway](https://railway.app)
2. Connect your GitHub repository
3. Add environment variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `PORT`

### Option 3: Manual GitHub Pages (Static Only)

For static hosting (frontend only):

1. **Build the frontend:**
   ```bash
   cd frontend
   npm run build
   ```

2. **Enable GitHub Pages:**
   - Go to your GitHub repository
   - Settings → Pages
   - Source: Deploy from a branch
   - Branch: `gh-pages`

3. **Deploy to gh-pages branch:**
   ```bash
   npm install -g gh-pages
   cd frontend
   npx gh-pages -d dist
   ```

## Environment Variables

Make sure to set these environment variables in your hosting service:

### Backend:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=production
PORT=5000
```

### Frontend:
```env
VITE_API_URL=https://your-backend-url.com/api
```

## 🔗 Live URLs

After deployment, your app will be available at:
- **Vercel**: `https://appointment-booking-system-vidit72wanjari.vercel.app`
- **Netlify**: `https://appointment-booking-vidit72wanjari.netlify.app`
- **GitHub Pages**: `https://vidit72wanjari.github.io/Appointment-Booking-System`

## 🛠️ Troubleshooting

### Common Issues:

1. **"Cannot connect to backend"**
   - Check if backend is deployed and running
   - Verify API URLs in frontend

2. **"MongoDB connection failed"**
   - Ensure MongoDB Atlas allows connections from `0.0.0.0/0`
   - Check environment variables

3. **"Build failed"**
   - Run `npm install` in both frontend and backend
   - Check for any missing dependencies

### Testing Deployment:

1. **Test locally first:**
   ```bash
   # Build frontend
   cd frontend && npm run build
   
   # Serve built files
   npx serve dist
   ```

2. **Test API endpoints:**
   ```bash
   curl https://your-backend-url.com/api/doctors
   ```

## 📱 Mobile Responsiveness

Your app is already mobile-responsive! Test on different screen sizes:
- Desktop: 1200px+
- Tablet: 768px - 1199px
- Mobile: 320px - 767px

---

Need help? Check the [main README](./README.md) for more details!