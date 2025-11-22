# 🔄 Migration Summary: OpenAI → Gemini, Incident.io → Zenduty

## Changes Made

### 1. AI Engine: OpenAI GPT-4 → Google Gemini 1.5 Flash

**Why?**
- ✅ **Free Tier**: 15 RPM, 1M tokens/day (vs OpenAI requiring paid account)
- ✅ **Cost Effective**: $0.00075/1K output tokens vs $0.03/1K for GPT-4
- ✅ **Fast**: Optimized for quick responses
- ✅ **Perfect for OpsMind**: Excellent analysis quality

**Changes:**
- Updated `package.json`: `openai` → `@google/generative-ai`
- Updated `.env.example`: `OPENAI_API_KEY` → `GEMINI_API_KEY`
- Rewrote `src/ai/engine.js` to use Gemini API
- All AI analysis methods now use `GoogleGenerativeAI`
- Model: `gemini-1.5-flash` (recommended for free tier)

**Setup Guide:** See `docs/GEMINI_SETUP.md`

---

### 2. Incident Management: Incident.io → Zenduty

**Why?**
- ✅ **Better Free Tier**: Up to 5 users, unlimited incidents
- ✅ **More Features**: On-call management, escalation policies
- ✅ **Better API**: Comprehensive webhook support
- ✅ **Integration Hub**: Connects with 100+ monitoring tools

**Changes:**
- Created `src/integrations/zenduty/webhookHandler.js`
- Created `src/integrations/zenduty/normalizer.js`
- Updated webhook route: `/webhook/incident` → `/webhook/zenduty`
- Updated `.env.example`: `INCIDENT_IO_API_KEY` → `ZENDUTY_API_KEY`
- Updated seed data: All incidents now source from `zenduty`
- Removed old `src/integrations/incident/` directory

**Setup Guide:** See `docs/ZENDUTY_SETUP.md`

---

## Updated Tech Stack

```
Backend:     Node.js + Express
Database:    PostgreSQL
AI:          Google Gemini 1.5 Flash (FREE)
Cache:       Redis
Queue:       BullMQ
Hosting:     Zoho Catalyst / Render
Cliq:        Deluge + Cliq SDK

Integrations:
  - Monday.com (Tasks)
  - Zenduty (Incidents)
  - Jibble (Time tracking)
  - Brex (Expenses)
  - Coda (Documentation)
```

---

## Quick Migration Steps

### For New Installations:

```bash
# 1. Install dependencies
npm install

# 2. Setup environment with NEW keys
cp .env.example .env
# Add: GEMINI_API_KEY (not OPENAI_API_KEY)
# Add: ZENDUTY_API_KEY (not INCIDENT_IO_API_KEY)

# 3. Initialize database
npm run db:seed

# 4. Start server
npm run dev
```

### For Existing Installations:

```bash
# 1. Update dependencies
npm install @google/generative-ai
npm uninstall openai

# 2. Update environment variables
# In .env:
#   OPENAI_API_KEY → GEMINI_API_KEY
#   AI_MODEL → gemini-1.5-flash
#   INCIDENT_IO_API_KEY → ZENDUTY_API_KEY

# 3. Update database (optional - if you want to keep data)
# No schema changes needed!
# Just update source_app in incidents table:
psql -d opsmind -c "UPDATE incidents SET source_app = 'zenduty' WHERE source_app = 'incident_io';"

# 4. Restart server
npm run dev
```

---

## API Key Setup

### Get Gemini API Key (FREE)
1. Visit: https://makersuite.google.com/app/apikey
2. Sign in with Google account
3. Click "Create API Key"
4. Copy and add to `.env`

### Get Zenduty API Key (FREE)
1. Visit: https://www.zenduty.com/
2. Sign up for free account
3. Go to Settings → API Keys
4. Create key and add to `.env`

---

## Testing the Changes

```bash
# Test AI with Gemini
curl http://localhost:3000/ops/risks
# Should return AI analysis powered by Gemini

# Test Zenduty webhook
curl -X POST http://localhost:3000/webhook/zenduty \
  -H "Content-Type: application/json" \
  -d '{
    "event_type": "incident.triggered",
    "incident": {
      "unique_id": "TEST-001",
      "summary": "Test incident",
      "urgency": 1
    }
  }'

# Verify incident stored
curl http://localhost:3000/ops/incidents
```

---

## Cost Comparison

### AI Analysis (per 1000 tokens)

| Provider | Input | Output | Free Tier |
|----------|-------|--------|-----------|
| **Gemini 1.5 Flash** | $0.00025 | $0.00075 | ✅ 1M tokens/day |
| OpenAI GPT-4 | $0.01 | $0.03 | ❌ None |

**Savings for OpsMind**: ~95% cost reduction + FREE tier!

### Incident Management (per month)

| Provider | Price | Users | Incidents |
|----------|-------|-------|-----------|
| **Zenduty** | FREE | 5 | Unlimited |
| Incident.io | $19/user | - | Unlimited |

**Savings for OpsMind**: $95/month for 5-user team!

---

## Breaking Changes

⚠️ **Environment Variables:**
- `OPENAI_API_KEY` → `GEMINI_API_KEY`
- `AI_MODEL` → `gemini-1.5-flash`
- `INCIDENT_IO_API_KEY` → `ZENDUTY_API_KEY`
- `INCIDENT_IO_WEBHOOK_SECRET` → `ZENDUTY_WEBHOOK_SECRET`

⚠️ **Webhook Endpoints:**
- `/webhook/incident` → `/webhook/zenduty`

⚠️ **Database Data:**
- Incidents `source_app` field: `incident_io` → `zenduty`
- No schema changes required

---

## Feature Parity

✅ All OpsMind features remain the same:
- Daily operational reports
- Risk detection and analysis
- Root-cause explanations
- Workload analysis
- Incident pattern detection
- AI-powered recommendations
- Slash commands in Cliq
- Interactive message cards

---

## Support & Documentation

- **Gemini Setup**: `docs/GEMINI_SETUP.md`
- **Zenduty Setup**: `docs/ZENDUTY_SETUP.md`
- **Main README**: `README.md`
- **Quick Start**: `QUICKSTART.md`

---

## Benefits Summary

### For Development:
- ✅ Free AI with generous limits
- ✅ Faster API responses (Gemini is optimized for speed)
- ✅ Better incident management features
- ✅ No credit card required for testing

### For Production:
- ✅ Significantly lower costs
- ✅ Better free tier for startups
- ✅ Room to scale without immediate costs
- ✅ Professional incident management

### For Cliqtrix:
- ✅ Uses free services (judges will appreciate)
- ✅ Modern AI model (Gemini is cutting-edge)
- ✅ Cost-effective solution (real-world viability)
- ✅ Easy to replicate (others can try it)

---

🎉 **Migration Complete! OpsMind is now more powerful, faster, and FREE!**
