#!/bin/bash

# Lalas Cleaning - Development Server Starter
# This script starts both the backend and frontend servers

echo "🧹 Starting Lalas Cleaning Development Environment..."
echo ""

# Color codes for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Start backend
echo -e "${BLUE}Starting Backend Server...${NC}"
cd backend
npm run dev &
BACKEND_PID=$!
echo -e "${GREEN}✓ Backend started (PID: $BACKEND_PID)${NC}"
echo ""

# Wait a moment for backend to start
sleep 2

# Start frontend
echo -e "${BLUE}Starting Frontend Server...${NC}"
cd ../frontend
npm run dev &
FRONTEND_PID=$!
echo -e "${GREEN}✓ Frontend started (PID: $FRONTEND_PID)${NC}"
echo ""

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}🎉 Lalas Cleaning is running!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "${YELLOW}Frontend:${NC} http://localhost:5173"
echo -e "${YELLOW}Backend:${NC}  http://localhost:5000"
echo -e "${YELLOW}API Health Check:${NC} http://localhost:5000/api/health"
echo ""
echo -e "${YELLOW}Press Ctrl+C to stop all servers${NC}"
echo ""

# Trap Ctrl+C to kill both processes
trap "kill $BACKEND_PID $FRONTEND_PID; echo -e '\n${GREEN}Servers stopped.${NC}'; exit" SIGINT

# Wait for both processes
wait
