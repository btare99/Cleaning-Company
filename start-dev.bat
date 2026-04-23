@echo off
REM Lalas Cleaning - Development Server Starter (Windows)
REM This script starts both the backend and frontend servers

echo.
echo 🧹 Starting Lalas Cleaning Development Environment...
echo.

REM Start backend
echo Starting Backend Server...
cd backend
start "Lalas Backend" cmd /k npm run dev
timeout /t 2 /nobreak

REM Start frontend
echo Starting Frontend Server...
cd ..\frontend
start "Lalas Frontend" cmd /k npm run dev

echo.
echo ========================================
echo 🎉 Lalas Cleaning is running!
echo ========================================
echo.
echo Frontend:  http://localhost:5173
echo Backend:   http://localhost:5000
echo API Health Check: http://localhost:5000/api/health
echo.
echo Close the terminal windows to stop the servers.
echo.
pause
