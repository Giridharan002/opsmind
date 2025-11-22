# 🚀 OpsMind - Updated Configuration Quick Reference

## ✨ What Changed

**AI Provider:** OpenAI GPT-4 → **Google Gemini 1.5 Flash** (FREE)  
**Incident Tool:** Incident.io → **Zenduty** (FREE tier with better features)

---

## 📋 Environment Variables (.env)

```bash
# Server
PORT=3000
NODE_ENV=development

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/opsmind

# Redis (optional)
REDIS_URL=redis://localhost:6379

# AI Configuration - GOOGLE GEMINI (FREE)
GEMINI_API_KEY=your_gemini_api_key_here
AI_MODEL=gemini-1.5-flash

# Zoho Cliq
CLIQ_WEBHOOK_URL=https://cliq.zoho.com/api/v2/bots/your_bot_id
CLIQ_ACCESS_TOKEN=your_cliq_access_token

# External Integrations
MONDAY_API_KEY=your_monday_api_key
MONDAY_WEBHOOK_SECRET=your_webhook_secret

ZENDUTY_API_KEY=your_zenduty_api_key
ZENDUTY_WEBHOOK_SECRET=your_webhook_secret

OUTLOOK_CLIENT_ID=your_outlook_client_id
OUTLOOK_CLIENT_SECRET=your_outlook_client_secret

BREX_API_KEY=your_brex_api_key
CODA_API_KEY=your_coda_api_key

# Scheduler
DAILY_REPORT_TIME=09:00
DAILY_REPORT_CHANNEL=general
```

---

## 🔑 Getting API Keys

### Google Gemini (FREE)
1. Visit: https://makersuite.google.com/app/apikey
2. Sign in with Google
3. Click "Create API Key"
4. Copy key → Add to `.env` as `GEMINI_API_KEY`

**Free Tier Limits:**
- 15 requests/minute
- 1 million tokens/day
- Perfect for OpsMind!

### Zenduty (FREE)
1. Visit: https://www.zenduty.com/
2. Sign up for free account
3. Go to: Settings → API Keys
4. Create key → Add to `.env` as `ZENDUTY_API_KEY`
5. Setup webhook:
   - Services → Add Integration → Custom Webhook
   - Webhook URL: `https://your-backend.com/webhook/zenduty`
   - Copy secret → Add to `.env` as `ZENDUTY_WEBHOOK_SECRET`

**Free Tier Limits:**
- Up to 5 team members
- Unlimited incidents
- Full API access
- Webhooks enabled

---

## 🔌 Webhook Endpoints

| Tool | Endpoint | Method |
|------|----------|--------|
| Monday.com | `/webhook/monday` | POST |
| **Zenduty** | `/webhook/zenduty` | POST |
| Test | `/webhook/test` | POST |

---

## 📊 API Endpoints (No Changes)

All endpoints remain the same:
- `GET /ops/status` - Team health
- `GET /ops/risks` - At-risk tasks
- `GET /ops/overload` - Overloaded members
- `GET /ops/incidents` - Incident analysis
- `GET /ops/sprint-delay` - Sprint delay analysis
- `POST /analyze/daily-report` - Generate daily report

---

## 🧪 Quick Test

```bash
# 1. Install dependencies
npm install

# 2. Setup environment
cp .env.example .env
# Edit .env with your keys

# 3. Initialize database with demo data
npm run db:seed

# 4. Start server
npm run dev

# 5. Test AI analysis (Gemini)
curl http://localhost:3000/ops/risks

# 6. Test Zenduty webhook
curl -X POST http://localhost:3000/webhook/zenduty \
  -H "Content-Type: application/json" \
  -d '{"event_type":"incident.triggered","incident":{"unique_id":"TEST-1","summary":"Test"}}'

# 7. Run full demo
npm run demo
```

---

## 💰 Cost Savings

| Item | Before | After | Savings |
|------|--------|-------|---------|
| AI (monthly) | ~$50 | **FREE** | $50 |
| Incidents (5 users) | $95 | **FREE** | $95 |
| **Total** | **$145/mo** | **$0/mo** | **$145/mo** |

**Annual Savings: $1,740** 🎉

---

## 📚 Documentation

- **Main Guide**: `README.md`
- **Quick Start**: `QUICKSTART.md`
- **Gemini Setup**: `docs/GEMINI_SETUP.md`
- **Zenduty Setup**: `docs/ZENDUTY_SETUP.md`
- **Migration Guide**: `MIGRATION.md`

---

## ✅ Updated Tech Stack

```
Backend:     Node.js 18+ + Express
Database:    PostgreSQL 14+
AI:          Google Gemini 1.5 Flash ⭐ FREE
Cache:       Redis (optional)
Queue:       BullMQ
Hosting:     Zoho Catalyst / Render / Railway

Integrations:
  ✅ Monday.com (Tasks)
  ✅ Zenduty (Incidents) ⭐ NEW
  ✅ Jibble (Time tracking)
  ✅ Brex (Expenses)
  ✅ Coda (Documentation)
  ✅ Outlook Calendar
```

---

## 🎯 Why These Changes?

### Google Gemini
- ✅ **Free tier** with generous limits (15 RPM, 1M tokens/day)
- ✅ **Fast responses** (~1-2s vs 3-5s for GPT-4)
- ✅ **Great quality** for operational analysis
- ✅ **Easy signup** (just need Google account)
- ✅ **Cost effective** if scaling ($0.00075/1K vs $0.03/1K)

### Zenduty
- ✅ **Better free tier** (5 users, unlimited incidents)
- ✅ **More features** (on-call, escalations, integrations)
- ✅ **Modern UI** with better incident management
- ✅ **Comprehensive API** with webhook support
- ✅ **Integration hub** (connects with 100+ tools)

---

## 🚀 Ready to Run!

```bash
npm install
npm run db:seed
npm run dev
npm run demo
```

**All features work exactly the same, but now it's FREE and FASTER!** 🎉
