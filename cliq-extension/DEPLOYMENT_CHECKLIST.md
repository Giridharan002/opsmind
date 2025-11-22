# 🚀 OpsMind Cliq Extension - Deployment Checklist

## ✅ Phase 1: Backend Deployment (Required First)

### Option A: Vercel (Recommended - 5 minutes)
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy (from d:\opsmind directory)
vercel

# Get your URL: https://opsmind-xyz.vercel.app
```

### Option B: Railway (Alternative)
1. Go to https://railway.app
2. Connect GitHub repo
3. Select `opsmind` repo
4. Deploy automatically
5. Get URL from dashboard

### Option C: Render
1. Go to https://render.com
2. New → Web Service
3. Connect GitHub
4. Build: `npm install`
5. Start: `npm start`
6. Get URL

**✅ Verify Deployment:**
```bash
curl https://your-backend-url.com/health
# Should return: {"status":"ok"}
```

---

## ✅ Phase 2: Update Extension Files

### Files to Update (5 files)
Replace `BACKEND_URL = "https://your-opsmind-backend.vercel.app";` with your actual URL:

1. ✏️ `Commands/ops/Execution_Handler.dg` (Line 1)
2. ✏️ `Widgets/OpsMind.dg` (Line 2)
3. ✏️ `Message_Actions/Escalate_to_Incident.dg` (Line 3)
4. ✏️ `Message_Actions/Flag_Task_at_Risk.dg` (Line 3)
5. ✏️ `Schedulers/Daily_Report.dg` (Line 3)

**Find & Replace:**
- Find: `https://your-opsmind-backend.vercel.app`
- Replace with: `https://opsmind-abc123.vercel.app` (your actual URL)

---

## ✅ Phase 3: Create Cliq Extension

### Step 1: Access Cliq Developer Console
1. Go to https://cliq.zoho.com
2. Click your profile → Settings
3. Go to: **Extensions & Bots** → **Extensions**
4. Click: **Create Extension**
5. Choose: **Build from Scratch**

### Step 2: Basic Extension Info
- **Extension Name:** OpsMind
- **Unique Name:** opsmind_ai
- **Description:** AI-powered operations intelligence for Zoho Cliq
- **Category:** Productivity
- **Icon:** Upload a 512x512 PNG (create simple logo)

### Step 3: Create Bot
1. Click **Bots** tab → **Create Bot**
2. **Bot Name:** OpsMind Bot
3. **Bot Unique Name:** opsmind_bot
4. **Description:** Your AI operations analyst
5. **Avatar:** Same icon as extension
6. **Welcome Message Handler:**
   - Upload: `Bots/OpsMind_Bot/Welcome_Handler.dg`
   - Function name: `welcome_handler`
7. **Bot Menu:**
   - Add menu item: "Help"
   - Upload: `Bots/OpsMind_Bot/Menu/Help.dg`
   - Function name: `help_handler`

### Step 4: Create Slash Command
1. Click **Commands** tab → **Create Command**
2. **Command:** `/ops`
3. **Description:** AI operations intelligence commands
4. **Hint:** `status | risks | overload | incidents | sprint-delay | help`
5. **Execution Handler:**
   - Upload: `Commands/ops/Execution_Handler.dg`
   - Function name: `ops_command_handler`
6. **Suggestion Handler:**
   - Upload: `Commands/ops/Suggestion_Handler.dg`
   - Function name: `ops_suggestions`

### Step 5: Create Widget
1. Click **Widgets** tab → **Create Widget**
2. **Widget Name:** OpsMind Dashboard
3. **Unique Name:** opsmind_widget
4. **Description:** Interactive operations dashboard
5. **Icon:** Same as extension
6. **Handler:**
   - Upload: `Widgets/OpsMind.dg`
   - Function name: `widget_handler`

### Step 6: Create Message Actions
#### Action 1: Escalate to Incident
1. Click **Message Actions** → **Create Action**
2. **Name:** Escalate to Incident
3. **Unique Name:** escalate_incident
4. **Description:** Create incident from message
5. **Icon:** 🚨 emoji or upload icon
6. **Handler:**
   - Upload: `Message_Actions/Escalate_to_Incident.dg`
   - Function name: `escalate_handler`

#### Action 2: Flag Task at Risk
1. **Create Action** → **Flag Task at Risk**
2. **Unique Name:** flag_task_risk
3. **Description:** Mark task as at-risk
4. **Icon:** ⚠️ emoji
5. **Handler:**
   - Upload: `Message_Actions/Flag_Task_at_Risk.dg`
   - Function name: `flag_task_handler`

### Step 7: Create Scheduler
1. Click **Schedulers** tab → **Create Scheduler**
2. **Name:** Daily Operations Report
3. **Unique Name:** daily_ops_report
4. **Description:** Automated daily summary at 9 AM
5. **Schedule:** `0 9 * * *` (cron expression)
6. **Handler:**
   - Upload: `Schedulers/Daily_Report.dg`
   - Function name: `daily_report_handler`
7. **Target Channel:** `general` (or your preferred channel)

### Step 8: Save & Publish
1. Click **Save Extension**
2. **Test Mode:** Enable for your organization
3. **Install:** Click "Install to Organization"
4. Subscribe users to OpsMind Bot

---

## ✅ Phase 4: Testing

### Test Bot
- [ ] Open Cliq chat
- [ ] Subscribe to OpsMind Bot
- [ ] Check welcome message appears
- [ ] Try bot menu → Help

### Test Commands
- [ ] Type `/ops` → Auto-suggestions appear
- [ ] `/ops status` → Returns health metrics
- [ ] `/ops risks` → Shows AI analysis
- [ ] `/ops overload` → Shows workload data
- [ ] `/ops incidents` → Shows patterns
- [ ] `/ops sprint-delay` → Shows root cause (KILLER FEATURE!)
- [ ] `/ops help` → Shows command list

### Test Widget
- [ ] Open sidebar → Find OpsMind widget
- [ ] Click to open
- [ ] Navigate to each tab:
  - [ ] Overview tab → Health chart visible
  - [ ] Risks tab → Tasks displayed
  - [ ] Workload tab → Members listed
  - [ ] Incidents tab → Patterns shown
  - [ ] Sprint Delay tab → Root cause visible

### Test Message Actions
- [ ] Right-click any message
- [ ] Click "More" → "Escalate to Incident"
- [ ] Form appears
- [ ] Fill and submit
- [ ] Right-click message → "Flag Task at Risk"
- [ ] Form appears and works

### Test Scheduler
- [ ] Check scheduler is active
- [ ] Manually trigger (if possible) or wait for 9 AM
- [ ] Verify daily report posts to #general
- [ ] Check report content is correct

---

## ✅ Phase 5: Demo Preparation

### Record Demo Video (3-5 minutes)
1. **Introduction (30s)**
   - Show OpsMind bot welcome
   - Explain problem: "Teams don't know WHY sprints fail"

2. **Command Demo (90s)**
   - `/ops status` → Show health score
   - `/ops risks` → Show AI analysis
   - `/ops sprint-delay` → **REVEAL ROOT CAUSE!**

3. **Widget Demo (60s)**
   - Open widget
   - Navigate tabs
   - Show charts and data

4. **Automation Demo (30s)**
   - Show message action
   - Show daily report

5. **Closing (30s)**
   - Recap features
   - Show backend architecture diagram
   - "Built with Gemini AI + NeonDB + Zenduty"

### Create Presentation Slides
1. **Problem:** Sprint delays cost 30% velocity
2. **Solution:** AI root cause analysis
3. **Demo:** Live `/ops sprint-delay` command
4. **Architecture:** Show tech stack diagram
5. **Impact:** Save hours of debugging time
6. **Future:** Predictive analytics, auto-remediation

### Prepare GitHub Repo
- [ ] Clean code with comments
- [ ] Complete README.md
- [ ] Add LICENSE
- [ ] Add CONTRIBUTING.md
- [ ] Tag release v1.0.0
- [ ] Create demo screenshots folder

---

## 🎯 Demo Day Checklist

### Day Before
- [ ] Backend deployed and verified
- [ ] All Cliq features tested
- [ ] Demo video recorded
- [ ] Presentation ready
- [ ] Practice pitch (5 min limit)

### Demo Day
- [ ] Laptop charged
- [ ] Backup internet (phone hotspot)
- [ ] Cliq logged in
- [ ] Backend health check: `curl https://your-backend/health`
- [ ] Demo account ready
- [ ] Video backup ready (if live demo fails)

### Live Demo Flow (5 minutes)
1. **Hook (30s):** "What if Cliq could tell you WHY your sprint is failing?"
2. **Problem (30s):** "Teams waste hours debugging delays manually"
3. **Solution Demo (2 min):**
   - Show `/ops sprint-delay` command
   - AI analyzes and reveals root cause
   - Shows specific recommendations
4. **Architecture (1 min):** Tech stack overview
5. **Impact (1 min):** Benefits and future roadmap

---

## 🏆 Winning Factors

### Technical Excellence
- ✅ Full-stack integration (Backend + Cliq)
- ✅ AI-powered (Google Gemini)
- ✅ Production-ready code
- ✅ Multi-tool integration

### Innovation
- ✅ **Killer Feature:** Root cause analysis
- ✅ Proactive intelligence
- ✅ Predictive patterns
- ✅ Automated workflows

### User Experience
- ✅ Professional UI
- ✅ Intuitive commands
- ✅ Rich interactions
- ✅ Helpful automation

### Business Value
- ✅ Saves time
- ✅ Prevents delays
- ✅ Free to use (Gemini free tier)
- ✅ Scalable architecture

---

## 📞 Support

**Deployment Issues:**
- Check backend health: `curl https://your-backend/health`
- Verify environment variables in Vercel/Railway
- Check backend logs

**Cliq Extension Issues:**
- Review function logs in Cliq console
- Test backend endpoints with Postman
- Verify BACKEND_URL is correct in all files

**Demo Day Emergency:**
- Have video backup ready
- Test morning of demo
- Keep backend logs open
- Have Postman collection ready

---

## 🎉 You're Ready!

Follow this checklist step-by-step and you'll have a professional, hackathon-winning Cliq extension!

**Next Step:** Deploy your backend to Vercel (Phase 1)

Good luck! 🚀🏆
