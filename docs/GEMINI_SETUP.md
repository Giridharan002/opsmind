# Google Gemini API Setup Guide

OpsMind uses **Google Gemini 1.5 Flash** for AI-powered analysis. This model is perfect for our use case and offers a **free tier** with generous limits.

## Why Gemini 1.5 Flash?

- ✅ **Free Tier**: 15 requests per minute, 1 million tokens per day
- ✅ **Fast**: Optimized for quick responses
- ✅ **Capable**: Excellent for analysis, summarization, and recommendations
- ✅ **Cost-effective**: Perfect for Cliqtrix demo and small-medium teams

## Getting Your API Key

### Step 1: Get Gemini API Key
1. Visit: https://makersuite.google.com/app/apikey
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy your API key

### Step 2: Add to Environment
Edit your `.env` file:

```bash
GEMINI_API_KEY=your_api_key_here
AI_MODEL=gemini-1.5-flash
```

### Step 3: Verify Setup
Test the API connection:

```bash
npm run dev
curl http://localhost:3000/ops/risks
```

If you see AI analysis in the response, you're all set!

## Model Options

### Recommended for OpsMind:
- **gemini-1.5-flash** (Default)
  - Free tier: 15 RPM, 1M tokens/day
  - Best balance of speed and capability
  - Perfect for real-time operational analysis

### Alternative (if needed):
- **gemini-1.5-pro**
  - Free tier: 2 RPM, 32K tokens/minute
  - More powerful but slower
  - Use if you need deeper analysis

## Rate Limits (Free Tier)

| Model | Requests/Min | Tokens/Day | Input Tokens | Output Tokens |
|-------|--------------|------------|--------------|---------------|
| gemini-1.5-flash | 15 | 1,000,000 | 128K | 8K |
| gemini-1.5-pro | 2 | 32,000/min | 128K | 8K |

## API Usage in OpsMind

OpsMind makes AI calls for:
1. **Risk Analysis** (`/ops/risks`) - ~500 tokens
2. **Overload Analysis** (`/ops/overload`) - ~400 tokens
3. **Incident Analysis** (`/ops/incidents`) - ~600 tokens
4. **Sprint Delay Analysis** (`/ops/sprint-delay`) - ~800 tokens
5. **Daily Report** (`/analyze/daily-report`) - ~700 tokens

**Total per day**: ~50-100 requests (well within free limits)

## Error Handling

If you exceed rate limits, OpsMind will:
- Log the error
- Return cached analysis if available
- Provide fallback response: "AI analysis unavailable"

## Best Practices

1. **Cache results**: OpsMind uses Redis to cache AI responses
2. **Batch requests**: Daily report combines multiple analyses
3. **Monitor usage**: Check Google Cloud Console for usage stats

## Troubleshooting

### "API key not valid"
- Verify you copied the entire key
- Check for extra spaces in `.env`
- Generate a new key if needed

### "Rate limit exceeded"
- Wait 60 seconds
- Consider upgrading to paid tier
- Enable Redis caching

### "Model not found"
- Ensure `AI_MODEL=gemini-1.5-flash` in `.env`
- Check for typos in model name

## Upgrading to Paid Tier (Optional)

If you need higher limits:
1. Visit: https://console.cloud.google.com/
2. Enable billing
3. Navigate to Vertex AI → Generative AI
4. Rates: ~$0.00025 per 1K input tokens, ~$0.00075 per 1K output tokens

For OpsMind, this would cost ~$0.10-0.50 per day for a medium team.

## Comparison: Gemini vs OpenAI

| Feature | Gemini 1.5 Flash | GPT-4 |
|---------|------------------|-------|
| Free Tier | ✅ Yes (generous) | ❌ No |
| Speed | ⚡ Very Fast | 🐢 Slower |
| Quality | 🎯 Excellent | 🎯 Excellent |
| Cost (paid) | 💰 $0.00075/1K | 💰 $0.03/1K |
| Context Window | 128K tokens | 8K-128K tokens |

**Verdict**: Gemini is perfect for OpsMind!

## Support

- Gemini Documentation: https://ai.google.dev/docs
- API Key Management: https://makersuite.google.com/
- Google AI Forum: https://discuss.ai.google.dev/

🎉 Now you're ready to use AI-powered operational intelligence!
