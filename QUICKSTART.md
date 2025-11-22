# 🚀 OpsMind - Quick Start Guide

## Installation & Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment
```bash
cp .env.example .env
```

Edit `.env` and add your credentials:
- `DATABASE_URL` - PostgreSQL connection string
- `GEMINI_API_KEY` - Google Gemini API key (free tier - get from https://makersuite.google.com/app/apikey)
- `AI_MODEL` - Set to `gemini-1.5-flash` (recommended for free tier)
- `CLIQ_WEBHOOK_URL` - Zoho Cliq webhook URL (optional for testing)

### 3. Initialize Database
```bash
# Create schema only
npm run db:init

# Create schema + seed demo data
npm run db:seed
```

### 4. Start Server
```bash
# Development mode (auto-reload)
npm run dev

# Production mode
npm start
```

Server will start on `http://localhost:3000`

## Testing

### Test Health
```bash
curl http://localhost:3000/health
```

### Run Full API Tests
```bash
npm run test:api
```

### Run Demo Script
```bash
npm run demo
```

This runs the full judge demo showing all features!

## Cliq Bot Setup

1. Go to Zoho Cliq → Extensions → Create Extension
2. Upload files from `cliq-extension/` directory
3. Follow instructions in `cliq-extension/README.md`

## Quick API Examples

### Get Operations Status
```bash
curl http://localhost:3000/ops/status
```

### Get Tasks At Risk
```bash
curl http://localhost:3000/ops/risks
```

### Analyze Sprint Delay (Killer Feature!)
```bash
curl http://localhost:3000/ops/sprint-delay
```

### Send Test Webhook
```bash
curl -X POST http://localhost:3000/webhook/test \
  -H "Content-Type: application/json" \
  -d '{"test": "data"}'
```

### Generate Daily Report
```bash
curl -X POST http://localhost:3000/analyze/daily-report
```

## Project Structure
```
opsmind/
├── src/
│   ├── app.js              # Main app
│   ├── config/             # Database, Redis
│   ├── models/             # Data models
│   ├── routes/             # API routes
│   ├── controllers/        # Business logic
│   ├── integrations/       # Monday, Zenduty, etc.
│   ├── ai/                 # AI engine
│   ├── services/           # Cliq service
│   └── scheduler/          # Cron jobs
├── cliq-extension/         # Zoho Cliq bot
├── demo/                   # Demo scripts
├── test/                   # Tests
└── README.md
```

## Environment Variables

Required:
- `DATABASE_URL` - PostgreSQL connection
- `GEMINI_API_KEY` - Google Gemini API key (free tier)

Optional:
- `REDIS_URL` - For caching
- `CLIQ_WEBHOOK_URL` - For sending to Cliq
- `MONDAY_API_KEY` - Monday.com integration
- `ZENDUTY_API_KEY` - Zenduty integration

## Next Steps

1. ✅ Start the backend: `npm run dev`
2. ✅ Initialize database: `npm run db:seed`
3. ✅ Run tests: `npm run test:api`
4. ✅ Try demo: `npm run demo`
5. ⬜ Set up Cliq bot (see `cliq-extension/README.md`)
6. ⬜ Configure external tool webhooks
7. ⬜ Deploy to production

## Support

- Full docs: See `README.md`
- Cliq setup: See `cliq-extension/README.md`
- Architecture: See `opsming.md` and `internals.md`

## Demo for Judges

Run the demo script to see OpsMind in action:
```bash
npm run demo
```

This showcases:
- Team health monitoring
- Risk detection
- Overload analysis  
- Incident patterns
- **Sprint delay root cause analysis** (WOW moment!)

🎉 Ready to win Cliqtrix!
