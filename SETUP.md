# 🚀 Quick Setup Guide for OpsMind

## Prerequisites
- ✅ Node.js 18+ (you have v22.17.1 ✓)
- ✅ npm (included with Node.js)

## 3-Step Setup (5 minutes)

### Step 1: Get Free API Keys

#### A. NeonDB (Database - FREE)
1. Visit: **https://neon.tech/**
2. Sign up with GitHub/Google
3. Click "Create Project"
4. Name it: `opsmind`
5. **Copy the connection string** - looks like:
   ```
   postgresql://user:pass@ep-xxx-123.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```

#### B. Google Gemini (AI - FREE)
1. Visit: **https://makersuite.google.com/app/apikey**
2. Sign in with Google
3. Click "Create API Key"
4. **Copy the API key** - looks like:
   ```
   AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   ```

---

### Step 2: Configure OpsMind

**Option A: Automatic Setup (Recommended)**
```powershell
node setup/wizard.js
```
The wizard will ask for your NeonDB URL and Gemini key, then configure everything automatically.

**Option B: Manual Setup**
1. Open `d:\opsmind\.env` in notepad
2. Replace `DATABASE_URL=...` with your NeonDB connection string
3. Replace `GEMINI_API_KEY=...` with your Gemini API key
4. Save the file

---

### Step 3: Initialize & Run

```powershell
# 1. Initialize database with demo data
npm run db:seed

# 2. Start the server
npm run dev

# 3. In a new terminal, test it works
npm run demo
```

---

## What You'll See

### After `npm run db:seed`:
```
🔧 Initializing OpsMind database...
📝 Creating database schema...
✅ Schema created successfully
🌱 Seeding demo data...
✅ Demo data seeded successfully

📊 Database Statistics:
   Tasks: 8
   Incidents: 5
   Time Logs: 10
   Expenses: 9
   Documents: 4

🎉 Database initialization complete!
```

### After `npm run dev`:
```
🚀 OpsMind Backend running on port 3000
📊 Environment: development
✅ Database connected successfully
```

### After `npm run demo`:
```
🎬 OpsMind Demo Script
═══════════════════════════════════════
📊 SCENE 1: Team Operations Overview
═══════════════════════════════════════

Total Tasks: 8
At Risk: 3
Overdue: 3
Incidents Today: 5
Health Score: 65/100
...
```

---

## Quick Commands

```powershell
# Start development server
npm run dev

# Run tests
npm run test:api

# Run demo
npm run demo

# Reset database
npm run db:seed
```

---

## Testing the API

Once server is running (`npm run dev`), test these endpoints:

```powershell
# Health check
curl http://localhost:3000/health

# Team status
curl http://localhost:3000/ops/status

# Tasks at risk (with AI analysis)
curl http://localhost:3000/ops/risks

# Sprint delay analysis (KILLER FEATURE)
curl http://localhost:3000/ops/sprint-delay
```

---

## Troubleshooting

### "Database connection error"
- Check your NeonDB connection string in `.env`
- Verify project is active in NeonDB dashboard
- Make sure `?sslmode=require` is in the connection string

### "AI analysis unavailable"
- Check your Gemini API key in `.env`
- Verify key is valid at: https://makersuite.google.com/
- Make sure `AI_MODEL=gemini-1.5-flash`

### "Port 3000 already in use"
- Change port in `.env`: `PORT=3001`
- Or kill existing process: `Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process`

---

## What's Included in Demo Data

- 📋 **8 Tasks**: 3 overdue, 1 blocked, 4 in progress
- 🔥 **5 Incidents**: 2 critical, pattern detection
- ⏰ **10 Time Logs**: Shows overloaded team members
- 💰 **9 Expenses**: Includes spike detection
- 📄 **4 Document Updates**: Recent changes tracked

Perfect for demonstrating all OpsMind features!

---

## Next Steps

1. ✅ **Explore the API**: Try all `/ops/*` endpoints
2. ✅ **Set up Cliq Bot**: See `cliq-extension/README.md`
3. ✅ **Add Real Integrations**: Configure Monday.com, Zenduty
4. ✅ **Deploy**: See deployment guides in README.md

---

## Need Help?

- **Setup Issues**: See `docs/NEONDB_SETUP.md` and `docs/GEMINI_SETUP.md`
- **API Reference**: See `README.md`
- **Architecture**: See `docs/ARCHITECTURE.md`
- **Zenduty**: Already configured with your key!

---

## 🎉 You're Ready!

OpsMind is now running with:
- 🤖 **Google Gemini AI** for intelligent analysis
- 🗄️ **NeonDB** for serverless PostgreSQL
- 🔥 **Zenduty** integration ready
- 📊 **Demo data** for testing

**Time to win Cliqtrix 2025! 🏆**
