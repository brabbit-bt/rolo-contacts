# 🚀 Quick Start - Deploy & Share Rolo Contacts

## 🎯 One-Click Deployment

### Option 1: Railway (Easiest - Free)
1. **Fork this repo** to your GitHub
2. **Go to [Railway.app](https://railway.app)**
3. **Connect your GitHub** and select this repo
4. **Deploy** - Railway auto-detects it's a Node.js app
5. **Share the URL** with friends!

### Option 2: Local Development
```bash
# Clone and setup
git clone <your-repo-url>
cd rolo-contacts

# Install everything
npm run install:all

# Start both frontend and backend
npm run dev:full

# Open http://localhost:3000
```

## 📊 Shared Database

- **All contacts are shared** between you and your friends
- **Real-time updates** - changes appear immediately for everyone
- **No accounts needed** - simple and easy to use
- **Database file**: `server/contacts.json`

## 🌐 Production Deployment

### Railway (Recommended)
```bash
# Railway automatically:
# 1. Detects Node.js app
# 2. Installs dependencies
# 3. Builds the React app
# 4. Starts the server
# 5. Provides a public URL
```

### Manual Deployment
```bash
# Build and start
./deploy.sh

# Or manually:
npm run build:full
NODE_ENV=production npm start
```

## 📱 Features for Sharing

✅ **Shared contacts** - everyone sees the same data  
✅ **Real-time sync** - changes appear immediately  
✅ **Rich profiles** - comprehensive contact information  
✅ **Search & filter** - find contacts quickly  
✅ **Mobile responsive** - works on all devices  
✅ **No login required** - simple and accessible  

## 🔧 API Endpoints

- `GET /api/contacts` - Get all contacts
- `POST /api/contacts` - Create new contact
- `PUT /api/contacts/:id` - Update contact
- `DELETE /api/contacts/:id` - Delete contact
- `GET /api/contacts/search/:query` - Search contacts
- `GET /api/health` - Health check

## 📞 Support

If you need help:
1. Check the logs for error messages
2. Verify the API is running: `curl http://localhost:3001/api/health`
3. Check the database file: `server/contacts.json`
4. Restart the server: `npm run dev:full`

## 🎉 Ready to Share!

Once deployed, you'll have a URL like:
- `https://rolo-contacts.railway.app`
- `https://your-app.onrender.com`
- `http://localhost:3000` (local development)

Share this URL with your friends and start building your shared contact network! 🚀 