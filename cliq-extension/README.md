# Zoho Cliq Extension - OpsMind Bot

This directory contains the Zoho Cliq extension code for OpsMind.

## Files

- `plugin-manifest.json` - Extension manifest defining bot, commands, and permissions
- `bot-handler.deluge` - Main bot logic written in Deluge (Zoho's scripting language)
- `connection.json` - Backend API connection configuration

## Setup Instructions

### 1. Create Extension in Cliq

1. Go to Zoho Cliq → Settings → Bots & Tools → Extensions
2. Click "Create Extension"
3. Choose "Build from scratch"

### 2. Configure Bot

1. Upload `plugin-manifest.json`
2. Upload bot avatar image (create a 512x512 icon)
3. Set bot name: "OpsMind"
4. Set unique name: "opsmind_bot"

### 3. Add Bot Handler

1. Go to Functions section
2. Create new function named "opsmindBot"
3. Copy content from `bot-handler.deluge`
4. Save function

### 4. Configure Backend Connection

1. Go to Connections section
2. Add new connection:
   - Name: "OpsMind Backend"
   - Type: Custom Service
   - Base URL: Your backend URL (e.g., https://your-backend.com)

3. Store backend URL in encrypted variables:
   ```
   Variable Name: BACKEND_URL
   Value: https://your-backend-url.com
   Encrypted: Yes
   ```

### 5. Register Slash Commands

In the Extension Settings:
1. Add slash command: `/ops`
2. Link to function: `opsmindBot`
3. Add command hint: "status | risks | overload | incidents | sprint-delay"

### 6. Configure Webhooks (Optional)

For receiving daily reports:
1. Create webhook endpoint in your backend
2. Register webhook URL in Cliq extension
3. Backend will send daily reports via this webhook

### 7. Testing

Test the bot in Cliq:
```
/ops status
/ops risks
/ops overload
/ops incidents
/ops sprint-delay
```

Or mention the bot:
```
@OpsMind help
@OpsMind status
```

### 8. Publishing

1. Test thoroughly in sandbox
2. Add description and screenshots
3. Submit for internal distribution
4. For Cliqtrix: Submit demo video showing all features

## Command Reference

| Command | Description |
|---------|-------------|
| `/ops status` | Full team operational status |
| `/ops risks` | Tasks currently at risk |
| `/ops overload` | Overloaded team members |
| `/ops incidents` | Recent incident analysis |
| `/ops sprint-delay` | AI analysis of sprint delays |

## Message Cards

The bot sends interactive message cards with:
- Tables showing metrics
- AI-generated insights
- Actionable recommendations
- Links to detailed views

## Customization

### Modify Card Themes
Edit the `theme` parameter in bot-handler.deluge:
- `modern-inline` - Clean inline cards
- `modern` - Full-width cards
- `prompt` - Notification style

### Add New Commands

1. Add command to `plugin-manifest.json`
2. Add handler in `bot-handler.deluge`
3. Create corresponding backend endpoint

### Styling

Card colors and icons can be customized using emoji and markdown in the card sections.

## Troubleshooting

**Bot not responding:**
- Check if backend URL is configured correctly
- Verify backend is accessible from Zoho servers
- Check function logs in Cliq developer console

**Commands not working:**
- Verify slash command is registered
- Check function mapping in manifest
- Test backend API endpoints directly

**Card not displaying:**
- Validate card JSON structure
- Check for missing required fields
- Review Cliq API documentation for card format

## Support

For issues specific to Cliq extension development:
- Zoho Cliq API Docs: https://www.zoho.com/cliq/help/platform/
- Deluge Documentation: https://www.zoho.com/deluge/

For OpsMind backend issues:
- Check backend logs
- Test API endpoints with Postman
- Review README.md in root directory
