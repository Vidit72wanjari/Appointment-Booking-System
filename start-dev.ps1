# PowerShell script to start both dev server and frontend
Write-Host "🚀 Starting Appointment Booking System Development Servers..." -ForegroundColor Green

# Kill any existing Node processes to avoid port conflicts
Write-Host "🔄 Stopping existing Node processes..." -ForegroundColor Yellow
Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force

# Start backend dev server in background
Write-Host "🖥️ Starting Backend Server on port 5001..." -ForegroundColor Blue
Start-Process powershell -ArgumentList "-NoExit", "-Command", "node dev-server.js" -WindowStyle Minimized

# Wait for backend to start
Start-Sleep 3

# Start frontend in current terminal
Write-Host "⚛️ Starting Frontend Server on port 3000..." -ForegroundColor Cyan
Set-Location frontend
npm run dev