# 🚀 Deployment Guide for Rolo Contacts

This guide will help you deploy Rolo Contacts so you can share it with your friends. All contacts will be stored in a shared database.

## 🎯 Quick Deploy Options

### Option 1: Railway (Recommended - Free)
1. **Fork this repository** to your GitHub account
2. **Connect to Railway**: Go to [railway.app](https://railway.app) and connect your GitHub
3. **Deploy**: Railway will automatically detect the Node.js app and deploy it
4. **Share**: Get a public URL like `https://rolo-contacts.railway.app`

### Option 2: Render (Free)
1. **Fork this repository** to your GitHub account
2. **Connect to Render**: Go to [render.com](https://render.com) and connect your GitHub
3. **Create Web Service**: Choose your repository and set build command: `npm run build:full`
4. **Set start command**: `npm start`
5. **Deploy**: Render will build and deploy your app

### Option 3: Vercel + Railway (Best for scaling)
1. **Deploy backend** to Railway (for the API)
2. **Deploy frontend** to Vercel (for the React app)
3. **Set environment variable** in Vercel: `VITE_API_URL=https://your-railway-api.railway.app/api`

## 🛠 Local Development with Database

### Prerequisites
- Node.js 16+ installed
- Git installed

### Setup Steps

1. **Clone and install dependencies**
   ```bash
   git clone <your-repo-url>
   cd rolo-contacts
   npm run install:all
   ```

2. **Start both frontend and backend**
   ```bash
   npm run dev:full
   ```

3. **Access the app**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001
   - Health check: http://localhost:3001/api/health

### Database Location
- **File**: `server/contacts.json`
- **Format**: JSON array of contact objects
- **Backup**: This file contains all shared contacts

## 🌐 Production Deployment

### Environment Variables
Set these in your deployment platform:

```bash
NODE_ENV=production
PORT=3001
VITE_API_URL=https://your-api-url.com/api
```

### Build Process
1. **Frontend build**: `npm run build` creates `dist/` folder
2. **Backend setup**: Server serves static files from `dist/`
3. **Database**: `contacts.json` is created automatically

### File Structure for Deployment
```
rolo-contacts/
├── dist/                 # Built React app
├── server/
│   ├── server.js        # Express server
│   ├── contacts.json    # Shared database
│   └── package.json     # Backend dependencies
├── package.json         # Root dependencies
└── README.md
```

## 📊 Database Management

### Viewing Data
```bash
# View all contacts
curl http://localhost:3001/api/contacts

# Search contacts
curl http://localhost:3001/api/contacts/search/john

# Health check
curl http://localhost:3001/api/health
```

### Backup Database
```bash
# Copy the database file
cp server/contacts.json backup-contacts.json

# Restore database
cp backup-contacts.json server/contacts.json
```

### Database Schema
```json
[
  {
    "id": "uuid",
    "name": "John Doe",
    "linkedinUrl": "https://linkedin.com/in/johndoe",
    "company": "Tech Corp",
    "position": "Software Engineer",
    "relationshipContext": "Met at conference...",
    "relationshipPriority": 8,
    "notes": "Great conversation about...",
    "tags": ["tech", "conference"],
    "keywords": ["React", "TypeScript"],
    "meetingNotes": [...],
    "reminders": [...],
    "podcasts": [...],
    "interests": [...],
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
]
```

## 🔧 Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   # Kill existing processes
   pkill -f node
   # Or change port in server.js
   ```

2. **CORS errors**
   - Ensure `cors` middleware is enabled in server.js
   - Check that frontend URL is allowed

3. **Database not persisting**
   - Check file permissions on `contacts.json`
   - Ensure server has write access to the directory

4. **Build errors**
   ```bash
   # Clean install
   rm -rf node_modules package-lock.json
   npm run install:all
   ```

### Logs
```bash
# View server logs
npm run dev:server

# Check API health
curl http://localhost:3001/api/health
```

## 🚀 Scaling Options

### For More Users
1. **Database**: Switch from JSON file to PostgreSQL/MongoDB
2. **Authentication**: Add user accounts and data isolation
3. **Caching**: Add Redis for better performance
4. **CDN**: Use Cloudflare for static assets

### For Better Performance
1. **Database indexing**: Add indexes for search queries
2. **Pagination**: Implement pagination for large contact lists
3. **Caching**: Cache frequently accessed data
4. **Compression**: Enable gzip compression

## 📱 Sharing with Friends

### After Deployment
1. **Share the URL** with your friends
2. **All contacts are shared** - everyone sees the same data
3. **Real-time updates** - changes appear immediately for everyone
4. **No accounts needed** - simple and easy to use

### Features for Sharing
- ✅ **Shared database** - all contacts visible to everyone
- ✅ **Real-time updates** - changes sync immediately
- ✅ **Search and filter** - find contacts quickly
- ✅ **Rich profiles** - comprehensive contact information
- ✅ **Mobile responsive** - works on all devices

## 🔒 Security Considerations

### For Production
1. **Rate limiting**: Add rate limiting to prevent abuse
2. **Input validation**: Validate all user inputs
3. **HTTPS**: Always use HTTPS in production
4. **Backup**: Regular database backups
5. **Monitoring**: Add error tracking and monitoring

### Current Security
- ✅ **CORS enabled** - prevents unauthorized access
- ✅ **Input sanitization** - basic validation
- ✅ **Error handling** - graceful error responses
- ✅ **JSON validation** - validates contact data

## 📞 Support

If you need help with deployment:
1. Check the logs for error messages
2. Verify all environment variables are set
3. Test the API endpoints manually
4. Check the database file permissions

Happy sharing! 🎉 