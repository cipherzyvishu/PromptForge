# Environment Variables for Vercel Deployment

## Required Environment Variables:

### Google Gemini API (Required for AI features)
- **Variable:** `GEMINI_API_KEY`
- **Value:** Your Google Gemini API key
- **Description:** API key for Google Gemini AI service integration
- **How to get:** Visit [Google AI Studio](https://aistudio.google.com/app/apikey) to generate your API key

### Supabase Configuration (Required for database)
- **Variable:** `NEXT_PUBLIC_SUPABASE_URL`
- **Value:** Your Supabase project URL
- **Description:** Public URL for your Supabase database

- **Variable:** `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Value:** Your Supabase anonymous key
- **Description:** Public anonymous key for client-side database access

## Notes:
- The app requires Gemini API key for AI response generation
- Supabase is used for storing prompts and user data
- All environment variables are required for full functionality

## Vercel Deployment Steps:
1. Go to https://vercel.com
2. Sign in with GitHub
3. Click "New Project"
4. Import the "PromptForge" repository
5. Add the required environment variables in the Vercel dashboard
5. Deploy with default settings
6. Add environment variables if needed later
