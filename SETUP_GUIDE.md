# TravelPlace Setup Guide

## Issues Fixed ✅

### 1. Mapbox SDK Error (RESOLVED)
- **Problem**: `Error: Cannot create a client without an access token`
- **Solution**: Modified `controllers/travelplaces.js` to gracefully handle missing Mapbox token
- **Status**: Geocoding features disabled but server runs without errors

### 2. Port Conflict (RESOLVED)
- **Problem**: `Error: listen EADDRINUSE: address already in use :::5000`
- **Solution**: Changed default port from 5000 to 3001 in `app.js`
- **Status**: Server now runs on port 3001

### 3. MongoDB Connection (RESOLVED)
- **Problem**: `MongooseServerSelectionError`
- **Solution**: Installed and started MongoDB Community Edition
- **Status**: Database connection established

## Environment Setup

### Required Environment Variables
Create a `.env` file in the root directory with:

```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/travelplaces

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Mapbox Configuration (Get your token from https://account.mapbox.com/)
MAPBOX_TOKEN=your-mapbox-access-token-here

# Cloudinary Configuration (Get these from https://cloudinary.com/console)
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_KEY=your-cloudinary-api-key
CLOUDINARY_SECRET=your-cloudinary-api-secret

# Server Configuration
PORT=3001
NODE_ENV=development
```

### Getting API Keys

#### Mapbox (for geocoding/maps)
1. Go to [https://account.mapbox.com/](https://account.mapbox.com/)
2. Sign up or log in
3. Create a new access token
4. Copy the token to your `.env` file

#### Cloudinary (for image uploads)
1. Go to [https://cloudinary.com/console](https://cloudinary.com/console)
2. Sign up or log in
3. Copy your Cloud Name, API Key, and API Secret
4. Add them to your `.env` file

## Running the Application

### Backend Server
```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start

# Run both backend and frontend together
npm run dev:full
```

### Database
MongoDB is now installed and running automatically. To manage it:
```bash
# Start MongoDB
brew services start mongodb/brew/mongodb-community

# Stop MongoDB
brew services stop mongodb/brew/mongodb-community

# Check status
brew services list | grep mongodb
```

## Development Notes

- **Server URL**: `http://localhost:3001`
- **Database**: MongoDB running on `mongodb://localhost:27017/travelplaces`
- **Frontend**: React app in `/client` folder (runs on port 3000)
- **API Endpoints**: All API routes are prefixed with `/api`

## Current Status
✅ Server starts successfully on port 3001  
✅ Database connection established  
✅ Graceful handling of missing environment variables  
⚠️ Geocoding disabled until Mapbox token is provided  
⚠️ Image uploads limited until Cloudinary credentials are provided  

## Next Steps
1. Create `.env` file with your API keys
2. Test the React frontend: `cd client && npm start`
3. Test API endpoints using tools like Postman or curl
4. Seed the database if needed: `npm run seed` 