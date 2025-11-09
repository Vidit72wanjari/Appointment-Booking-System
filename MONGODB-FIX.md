# 🚨 RAILWAY MONGODB CONNECTION FIX

## ❌ Current Error:
```
MongooseError: The `uri` parameter to `openUri()` must be a string, got "undefined"
```

This means Railway can't find the MONGODB_URI environment variable.

---

## ✅ SOLUTION: Fix Railway Environment Variables

### Step 1: Railway Dashboard
1. Go to https://railway.app/dashboard
2. Click on your **Appointment-Booking-System** project
3. Click on your **service/deployment**
4. Click the **"Variables"** tab (NOT Settings)

### Step 2: Add Environment Variables
Click **"+ New Variable"** and add each of these:

**Variable 1:**
- Name: `MONGODB_URI`
- Value: `mongodb+srv://Vidit:Vidit%40123@cluster0.biw23mt.mongodb.net/appointmentDB?retryWrites=true&w=majority`

**Variable 2:**
- Name: `JWT_SECRET`  
- Value: `mysecretkey123`

**Variable 3:**
- Name: `NODE_ENV`
- Value: `production`

**Variable 4:**
- Name: `PORT`
- Value: `5000`

### Step 3: Redeploy
- Click **"Deploy Latest"** or **"Redeploy"**
- Wait for new deployment to start

### Step 4: Check Logs
In Railway logs, you should now see:
```
🔍 Environment Variables Check:
NODE_ENV: production
PORT: 5000
JWT_SECRET: SET
MONGODB_URI: SET
✅ MongoDB Connected
✅ Server running on http://localhost:5000
```

---

## 🆘 If Railway Variables Still Don't Work:

### Alternative 1: Render (More Reliable)
1. Go to https://render.com
2. "New" → "Web Service"
3. Connect GitHub: `Appointment-Booking-System`
4. Settings:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. **Environment Variables**: Add all 4 variables above
6. **Deploy**

### Alternative 2: Heroku
1. Install Heroku CLI: https://devcenter.heroku.com/articles/heroku-cli
2. Run:
```bash
heroku create your-app-name
heroku config:set MONGODB_URI="mongodb+srv://Vidit:Vidit%40123@cluster0.biw23mt.mongodb.net/appointmentDB?retryWrites=true&w=majority"
heroku config:set JWT_SECRET="mysecretkey123"
heroku config:set NODE_ENV="production"
git subtree push --prefix backend heroku main
```

---

## 🎯 Expected Success Result:
```
✅ Server running on http://localhost:5000
✅ MongoDB Connected
```

Your backend will be live and working! 🚀