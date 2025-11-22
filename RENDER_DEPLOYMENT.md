# 🚀 Deploy OpsMind to Render

## Quick Start (5 minutes)

### Step 1: Push Code to GitHub (if not already)
```bash
cd d:\opsmind
git add .
git commit -m "Ready for Render deployment"
git push origin main
```

### Step 2: Deploy on Render

1. **Go to Render Dashboard**
   - Visit: https://render.com
   - Click **Sign Up** or **Login** (use GitHub login)

2. **Create New Web Service**
   - Click: **New +** → **Web Service**
   - Connect your GitHub account
   - Select repository: `Giridharan002/opsmind`
   - Click **Connect**

3. **Configure Service**
   ```
   Name: opsmind-backend
   Region: Choose closest to you (e.g., Oregon USA, Frankfurt)
   Branch: main
   Root Directory: (leave empty)
   Runtime: Node
   Build Command: npm install
   Start Command: npm start
   Plan: Free
   ```

4. **Add Environment Variables**
   Click **Advanced** → Add these environment variables:

   ```
   DATABASE_URL=postgresql://neondb_owner:npg_Q5dUfJxYm7ep@ep-broad-thunder-ah34o4pn-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
   
   GEMINI_API_KEY=AIzaSyAbbT7DiXr5Ux8tBfYUCjd6HWQyNmgh7BA
   
   AI_MODEL=gemini-2.5-flash
   
   ZENDUTY_API_KEY=98265fb7be01514590b710978aac99ed0893c0f3
   
   NODE_ENV=production
   
   PORT=3000
   ```

5. **Deploy!**
   - Click **Create Web Service**
   - Wait 3-5 minutes for deployment
   - You'll get a URL like: `https://opsmind-backend.onrender.com`

### Step 3: Verify Deployment

Test your deployed backend:
```bash
curl https://opsmind-backend.onrender.com/health
```

Should return:
```json
{"status":"ok","timestamp":"2025-11-22T..."}
```

Test the ops endpoint:
```bash
curl https://opsmind-backend.onrender.com/ops/status
```

### Step 4: Update Cliq Extension Files

**Your Render URL will be something like:**
`https://opsmind-backend-abc123.onrender.com`

**Update these 5 files with your actual Render URL:**

1. `cliq-extension/Commands/ops/Execution_Handler.dg` (Line 2)
2. `cliq-extension/Widgets/OpsMind.dg` (Line 3)
3. `cliq-extension/Message_Actions/Escalate_to_Incident.dg` (Line 4)
4. `cliq-extension/Message_Actions/Flag_Task_at_Risk.dg` (Line 4)
5. `cliq-extension/Schedulers/Daily_Report.dg` (Line 4)

**Find this line:**
```deluge
BACKEND_URL = "https://your-opsmind-backend.vercel.app";
```

**Replace with:**
```deluge
BACKEND_URL = "https://opsmind-backend-abc123.onrender.com";
```

---

## 🔧 Render Configuration Details

### Free Plan Limits
- ✅ 750 hours/month (enough for 24/7)
- ✅ Automatic HTTPS
- ✅ Custom domains
- ⚠️ Sleeps after 15 min inactivity (wakes in ~30 seconds)
- ⚠️ 512 MB RAM

### Keep Your App Awake (Optional)
Render free tier sleeps after 15 minutes. To keep it awake:

**Option 1: Use UptimeRobot**
1. Go to https://uptimerobot.com (free)
2. Add monitor: `https://your-render-url.onrender.com/health`
3. Interval: 5 minutes
4. Will ping your app to keep it awake

**Option 2: Add Cron Job**
In your Render dashboard:
- Add cron job: `curl https://your-render-url.onrender.com/health`
- Schedule: Every 10 minutes

### Troubleshooting

**Build Failed:**
- Check `package.json` has correct dependencies
- Verify Node.js version compatibility
- Check Render logs

**App Crashes:**
- Check environment variables are set
- Verify DATABASE_URL is correct
- Check Render logs for errors

**Database Connection Failed:**
- Verify NeonDB connection string
- Check SSL mode in DATABASE_URL
- Test NeonDB from local first

**502 Bad Gateway:**
- App is still starting (wait 1-2 minutes)
- Check PORT is set to 3000
- Verify `npm start` command works locally

---

## 📊 Deployment Checklist

### Before Deployment
- [x] Code works locally (`npm run dev`)
- [x] Database configured (NeonDB)
- [x] Environment variables ready
- [x] Code pushed to GitHub

### During Deployment
- [ ] Render service created
- [ ] Environment variables added
- [ ] Build completes successfully
- [ ] Service shows "Live"

### After Deployment
- [ ] Health check returns 200 OK
- [ ] `/ops/status` endpoint works
- [ ] `/ops/sprint-delay` returns data
- [ ] All 5 Cliq extension files updated
- [ ] Extension uploaded to Zoho Cliq

---

## 🎯 Next Steps After Deployment

1. **Copy your Render URL**
   - Example: `https://opsmind-backend-xyz.onrender.com`

2. **Update Cliq Extension**
   - Replace BACKEND_URL in 5 files
   - Follow: `DEPLOYMENT_CHECKLIST.md` Phase 3

3. **Test Everything**
   - Backend endpoints
   - Cliq commands
   - Widget functionality

4. **Demo Preparation**
   - Record video
   - Prepare slides
   - Practice pitch

---

## 💡 Pro Tips

1. **Custom Domain (Optional)**
   - Add custom domain in Render settings
   - Update DNS records
   - Free SSL included

2. **Monitoring**
   - Render shows logs in real-time
   - Check "Logs" tab for debugging
   - Set up alerts for downtime

3. **Scaling**
   - Upgrade to paid plan if needed ($7/month)
   - Get always-on service (no sleep)
   - More RAM and faster response

4. **Environment Management**
   - Keep `.env` file locally for development
   - Never commit `.env` to GitHub
   - Use Render dashboard for production vars

---

## 🚀 You're Ready!

Once deployed:
1. ✅ Backend publicly accessible
2. ✅ Cliq can connect to your APIs
3. ✅ All features work end-to-end
4. ✅ Ready for hackathon demo!

**Happy Deploying! 🎉**
