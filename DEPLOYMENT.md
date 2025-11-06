# 🚀 InfoHub Deployment Guide

## Vercel Deployment (Recommended)

### ✅ **What's Been Set Up**

Your project is now configured for **Vercel deployment** with:

1. **Serverless API Functions** (`/api/` folder)
   - `/api/weather/[city].js` - Weather data
   - `/api/currency/convert.js` - Currency conversion
   - `/api/quotes/random.js` - Random quotes
   - `/api/health.js` - Health check

2. **Frontend Build Configuration**
   - React + Vite setup
   - API calls updated for production
   - Proper build scripts

3. **Vercel Configuration** (`vercel.json`)
   - Routes configured for API and frontend
   - Environment variables setup

### 📋 **Deployment Steps**

#### 1. **Install Vercel CLI** (if not installed)
```bash
npm install -g vercel
```

#### 2. **Login to Vercel**
```bash
vercel login
```

#### 3. **Deploy to Vercel**
```bash
vercel --prod
```

Or use the npm script:
```bash
npm run vercel-deploy
```

#### 4. **Set Environment Variables in Vercel**
After deployment, go to your Vercel dashboard:
1. Select your project
2. Go to Settings → Environment Variables
3. Add: `WEATHER_API_KEY` = `f486454436374f689a5185811250511`

#### 5. **Redeploy** (to apply environment variables)
```bash
vercel --prod
```

### 🎯 **Your API Endpoints on Vercel**

Once deployed, your APIs will be available at:
- `https://your-app.vercel.app/api/weather/London`
- `https://your-app.vercel.app/api/currency/convert?amount=1000`
- `https://your-app.vercel.app/api/quotes/random`
- `https://your-app.vercel.app/api/health`

### 🛠️ **Troubleshooting**

**"Not Found" Page:**
- ✅ Make sure `vercel.json` is in the root directory
- ✅ Check that API functions are in the `/api/` folder
- ✅ Verify frontend builds correctly: `npm run build`

**API Not Working:**
- ✅ Set `WEATHER_API_KEY` in Vercel environment variables
- ✅ Redeploy after setting environment variables
- ✅ Check Vercel function logs for errors

**Build Errors:**
- ✅ Run `npm install` in both root and frontend directories
- ✅ Check that all dependencies are installed

### 🌐 **Alternative Deployment Options**

#### **Netlify**
```bash
# Install Netlify CLI
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

#### **Railway** (Full-stack)
```bash
# Deploy both frontend and backend
railway login
railway init
railway up
```

#### **Heroku** (Full-stack)
```bash
# Move server.js to root, update package.json
heroku create
git push heroku main
```

### 📱 **Testing Your Deployed App**

1. **Frontend**: `https://your-app.vercel.app`
2. **Weather API**: `https://your-app.vercel.app/api/weather/London`
3. **Currency API**: `https://your-app.vercel.app/api/currency/convert?amount=1000`
4. **Quotes API**: `https://your-app.vercel.app/api/quotes/random`

### 🔧 **Local Development**

To test locally with the new setup:
```bash
# Install dependencies
npm install
cd backend/frontend && npm install

# Start frontend (will use Vercel-like API routes)
cd backend/frontend && npm run dev
```

**Your InfoHub is now ready for Vercel deployment!** 🎉

Need help with any deployment step?
