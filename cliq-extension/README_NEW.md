# OpsMind Cliq Extension

Professional Zoho Cliq integration for OpsMind AI Operations Intelligence Platform.

## 🎯 Features

### 🤖 Bot
- **Welcome Handler** - Onboarding experience for new users
- **Help Menu** - Interactive command guide
- Auto-subscribes users to OpsMind

### 💬 Slash Commands
- `/ops status` - Team operations overview with health score
- `/ops risks` - Tasks at risk with AI analysis
- `/ops overload` - Team workload analysis
- `/ops incidents` - Incident pattern detection
- `/ops sprint-delay` - **🌟 KILLER FEATURE** - AI-powered root cause analysis
- `/ops help` - Show all commands

### 📊 Interactive Widget
Multi-tab dashboard with:
- **Overview** - Health score chart and metrics
- **Risks** - At-risk tasks gallery view
- **Workload** - Overloaded team members
- **Incidents** - Pattern detection
- **Sprint Delay** - Root cause analysis with recommendations

### 🎯 Message Actions
Right-click on any message:
- **Escalate to Incident** - Create incident from message
- **Flag Task at Risk** - Mark task as at-risk

### ⏰ Scheduler
- **Daily Report** - Automated daily operations summary at 9 AM
- Posts to configured channel with health metrics and alerts

## 📁 Structure

```
cliq-extension/
├── Bots/
│   └── OpsMind_Bot/
│       ├── Welcome_Handler.dg
│       └── Menu/
│           └── Help.dg
├── Commands/
│   └── ops/
│       ├── Execution_Handler.dg
│       └── Suggestion_Handler.dg
├── Widgets/
│   └── OpsMind.dg
├── Message_Actions/
│   ├── Escalate_to_Incident.dg
│   └── Flag_Task_at_Risk.dg
├── Schedulers/
│   └── Daily_Report.dg
└── plugin-manifest.json
```

## 🚀 Installation Guide

### Step 1: Deploy Backend (Required)
Your OpsMind backend must be publicly accessible. Deploy to:
- **Vercel** (recommended): `vercel deploy`
- **Railway**: Connect GitHub repo
- **Render**: Connect GitHub repo

Get your public URL (e.g., `https://opsmind.vercel.app`)

### Step 2: Configure Extension Files
Update `BACKEND_URL` in these files:
- `Commands/ops/Execution_Handler.dg`
- `Widgets/OpsMind.dg`
- `Message_Actions/Escalate_to_Incident.dg`
- `Message_Actions/Flag_Task_at_Risk.dg`
- `Schedulers/Daily_Report.dg`

Replace:
```deluge
BACKEND_URL = "https://your-opsmind-backend.vercel.app";
```

### Step 3: Create Cliq Extension

1. **Open Zoho Cliq**
   - Go to https://cliq.zoho.com
   - Click Settings → Extensions → Create Extension

2. **Create Bot**
   - Name: `OpsMind Bot`
   - Upload: `Bots/OpsMind_Bot/Welcome_Handler.dg`
   - Add Menu Item: Upload `Bots/OpsMind_Bot/Menu/Help.dg`

3. **Create Command**
   - Command: `/ops`
   - Description: `AI Operations Intelligence`
   - Execution Handler: Upload `Commands/ops/Execution_Handler.dg`
   - Suggestion Handler: Upload `Commands/ops/Suggestion_Handler.dg`

4. **Create Widget**
   - Name: `OpsMind`
   - Description: `Operations Dashboard`
   - Upload: `Widgets/OpsMind.dg`

5. **Create Message Actions**
   - Action 1: `Escalate to Incident`
     - Upload: `Message_Actions/Escalate_to_Incident.dg`
   - Action 2: `Flag Task at Risk`
     - Upload: `Message_Actions/Flag_Task_at_Risk.dg`

6. **Create Scheduler**
   - Name: `Daily Operations Report`
   - Schedule: `0 9 * * *` (9:00 AM daily)
   - Upload: `Schedulers/Daily_Report.dg`

### Step 4: Test Extension

1. Subscribe to OpsMind Bot
2. Try commands: `/ops status`, `/ops sprint-delay`
3. Open OpsMind Widget from sidebar
4. Right-click a message → More → `Escalate to Incident`

## 🎨 Customization

### Change Report Time
Edit `Schedulers/Daily_Report.dg` and your `.env`:
```
DAILY_REPORT_TIME=09:00
DAILY_REPORT_CHANNEL=general
```

### Custom Icons
Replace placeholder image URLs in `.dg` files:
- `https://i.imgur.com/OpsMind.png` - Bot icon
- `https://i.imgur.com/status.png` - Command icons

### Add More Commands
Create new files in `Commands/ops/` following the pattern.

## 🏆 Demo Flow for Judges

1. **Show Bot Welcome**: Subscribe to bot
2. **Run Commands**: 
   - `/ops status` → Show health score
   - `/ops risks` → AI analysis
   - `/ops sprint-delay` → **KILLER FEATURE**
3. **Open Widget**: Interactive dashboard with tabs
4. **Message Action**: Right-click message → Escalate
5. **Daily Report**: Show automated morning summary

## 💡 Tips

- **Bot responses** use rich cards with emojis
- **Widget** has 5 tabs with charts and galleries
- **Commands** support auto-suggestions
- **Scheduler** posts to any channel
- **Message actions** create forms for user input

## 🔧 Troubleshooting

**"Backend Offline" error**:
- Check `BACKEND_URL` is correct
- Verify backend is deployed and running
- Test endpoint: `curl https://your-backend/health`

**Commands not appearing**:
- Verify command name is exactly `/ops`
- Check Execution_Handler.dg is uploaded
- Refresh Cliq

**Widget empty**:
- Check backend API returns data
- Verify `BACKEND_URL` in OpsMind.dg
- Check browser console for errors

## 📚 Resources

- [Zoho Cliq Extensions Guide](https://www.zoho.com/cliq/help/platform/)
- [Deluge Scripting Reference](https://www.zoho.com/deluge/)
- OpsMind Backend: See main project README

## 🎯 Hackathon Judges

This extension showcases:
- ✅ Professional bot with welcome flow
- ✅ Rich slash commands with AI integration
- ✅ Interactive multi-tab widget
- ✅ Context menu actions
- ✅ Automated daily reports
- ✅ Clean code structure
- ✅ Production-ready deployment
