# NeonDB Setup Guide for OpsMind

## What is NeonDB?

NeonDB is a serverless PostgreSQL database that:
- ✅ Has a generous **FREE tier** (512MB storage, 0.5 GB data transfer)
- ✅ Requires **no installation** - fully cloud-based
- ✅ Provides instant setup with connection string
- ✅ Auto-scales and auto-suspends when inactive
- ✅ Compatible with standard PostgreSQL tools

Perfect for OpsMind development and demos!

---

## Step-by-Step Setup

### 1. Create NeonDB Account

1. Go to: **https://neon.tech/**
2. Click "Sign Up" (free)
3. Sign in with GitHub, Google, or email
4. Verify your email

### 2. Create a New Project

1. Click "Create Project" or "New Project"
2. Enter project details:
   - **Name**: `opsmind`
   - **Region**: Choose closest to you (e.g., US East, EU Central)
   - **PostgreSQL Version**: 16 (latest)
3. Click "Create Project"

### 3. Get Connection String

After project creation, you'll see a connection string like:

```
postgresql://username:password@ep-cool-name-123456.us-east-2.aws.neon.tech/neondb?sslmode=require
```

**Important**: Copy this immediately! You'll need it for your `.env` file.

### 4. Configure OpsMind

Edit your `d:\opsmind\.env` file and replace the `DATABASE_URL`:

```bash
DATABASE_URL=postgresql://your_neon_connection_string_here
```

**Example**:
```bash
DATABASE_URL=postgresql://alex:AbC123xyz@ep-cool-morning-123456.us-east-2.aws.neon.tech/neondb?sslmode=require
```

---

## Initialize Database

Once your `.env` is configured, run:

```bash
# Initialize database schema and seed demo data
npm run db:seed
```

This will:
1. Create all tables (tasks, incidents, timelogs, expenses, docs)
2. Add demo data for testing
3. Show you a summary of what was created

---

## Verify Connection

Test your database connection:

```bash
# Start the server
npm run dev

# In another terminal, test the API
curl http://localhost:3000/health
```

You should see:
```json
{
  "status": "healthy",
  "service": "OpsMind Backend",
  "timestamp": "2025-11-22T..."
}
```

---

## NeonDB Dashboard Features

Access your NeonDB dashboard at: https://console.neon.tech/

### Useful Features:

1. **SQL Editor**: Run queries directly in browser
2. **Monitoring**: See connection stats and usage
3. **Branches**: Create database branches for testing
4. **Backups**: Point-in-time restore available
5. **Metrics**: Storage, compute, and data transfer

---

## Connection Options

### Option 1: Direct Connection String (Recommended for OpsMind)
```bash
DATABASE_URL=postgresql://user:pass@host/db?sslmode=require
```

### Option 2: Pooled Connection (For Production)
NeonDB also provides a pooled connection for better performance:
```bash
DATABASE_URL=postgresql://user:pass@host/db?sslmode=require&pgbouncer=true
```

For OpsMind development, **Option 1** is fine.

---

## Troubleshooting

### "Connection refused"
- Check your connection string is correct
- Verify project is not suspended (auto-resumes on connection)
- Check firewall/network settings

### "SSL required"
- Ensure `?sslmode=require` is in your connection string
- NeonDB requires SSL for security

### "Too many connections"
- Free tier has connection limits
- Make sure you're closing connections properly
- Consider using connection pooling

### "Database not found"
- Default database name is usually `neondb`
- Check your connection string for correct database name

---

## Free Tier Limits

| Resource | Free Tier |
|----------|-----------|
| Storage | 512 MB |
| Data Transfer | 0.5 GB/month |
| Compute Hours | 191 hours/month |
| Branches | 10 |
| Projects | 1 |

**Note**: OpsMind demo data uses ~5MB, well within limits!

---

## Managing Your Database

### View Tables
```sql
-- In NeonDB SQL Editor
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';
```

### Check Data
```sql
-- See how many records in each table
SELECT 'tasks' as table_name, COUNT(*) FROM tasks
UNION ALL
SELECT 'incidents', COUNT(*) FROM incidents
UNION ALL
SELECT 'timelogs', COUNT(*) FROM timelogs
UNION ALL
SELECT 'expenses', COUNT(*) FROM expenses
UNION ALL
SELECT 'document_updates', COUNT(*) FROM document_updates;
```

### Reset Database (if needed)
```sql
-- Drop all tables (careful!)
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
```

Then run `npm run db:seed` again.

---

## Upgrading (Optional)

If you need more resources later:

| Plan | Price | Storage | Compute | Transfer |
|------|-------|---------|---------|----------|
| Free | $0 | 512 MB | 191 hrs/mo | 0.5 GB |
| Pro | $19/mo | 10 GB | Unlimited | 5 GB |
| Custom | Variable | Custom | Custom | Custom |

For OpsMind production with 10-50 users, **Free tier** should be sufficient!

---

## Security Best Practices

1. ✅ **Never commit** `.env` file to Git
2. ✅ **Rotate credentials** if exposed
3. ✅ Use environment variables for production
4. ✅ Enable SSL (included by default in NeonDB)
5. ✅ Limit database user permissions if needed

---

## NeonDB vs Local PostgreSQL

| Feature | NeonDB | Local PostgreSQL |
|---------|--------|------------------|
| Setup Time | 2 minutes | 30+ minutes |
| Installation | None | Required |
| Backups | Automatic | Manual |
| Scaling | Auto | Manual |
| Cost | Free tier | Free (local) |
| Access | Anywhere | Local only |

**For OpsMind demo/development**: NeonDB is perfect! ✨

---

## Support

- NeonDB Docs: https://neon.tech/docs
- Discord Community: https://discord.gg/neon
- Email Support: support@neon.tech
- Status Page: https://neonstatus.com/

---

## Quick Command Reference

```bash
# After getting NeonDB connection string:

# 1. Update .env with your DATABASE_URL
notepad .env

# 2. Initialize database
npm run db:seed

# 3. Start server
npm run dev

# 4. Test API
curl http://localhost:3000/ops/status

# 5. Run demo
npm run demo
```

🎉 You're ready to go with NeonDB!
