# 🏥 HealthShare Frontend

AI-Powered Health Platform - Frontend Application

## 🚀 Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Ashwath2103/health-frontend)

## 📋 Prerequisites

- Node.js 18+
- Backend API running (see [health-backend](https://github.com/Ashwath2103/health-backend))
- LiveKit account for video consultations

## 🛠️ Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Create `.env.local` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_LIVEKIT_URL=wss://your-project.livekit.cloud
```

### 3. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🌐 Vercel Deployment

### Method 1: Vercel Dashboard (Recommended)

1. **Go to [vercel.com](https://vercel.com)**
2. **Click "Add New Project"**
3. **Import Git Repository:**
   - Select: `Ashwath2103/health-frontend`
4. **Configure Project:**
   - Framework Preset: **Next.js** (auto-detected)
   - Root Directory: `./` (leave as default)
5. **Add Environment Variables:**
   ```
   NEXT_PUBLIC_API_URL = https://your-backend-url.com
   NEXT_PUBLIC_LIVEKIT_URL = wss://your-project.livekit.cloud
   ```
6. **Click "Deploy"**

### Method 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Add environment variables
vercel env add NEXT_PUBLIC_API_URL
vercel env add NEXT_PUBLIC_LIVEKIT_URL

# Deploy to production
vercel --prod
```

## 🔧 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | `https://api.healthshare.com` |
| `NEXT_PUBLIC_LIVEKIT_URL` | LiveKit WebSocket URL | `wss://project.livekit.cloud` |

## 📦 Build

```bash
npm run build
```

## ✨ Features

- 🎨 Modern UI with Tailwind CSS & Shadcn
- 🤖 AI Health Assistant with 3D animations
- 📹 Video Consultations (LiveKit)
- 🔐 Dual Portal (Citizen & Doctor)
- 📱 Fully Responsive
- 🌙 Dark Mode Support

## 🔗 Related

- **Backend:** [health-backend](https://github.com/Ashwath2103/health-backend)
- **Main Repo:** [healthshare-platform](https://github.com/Shashanth27/healthshare-platform)

## 📄 License

MIT
