# Unstoppabl AI Search Engine (Vercel Version)

This version is structured for Vercel's serverless architecture.

## Files
- `api/ask.js`: The serverless function endpoint for handling real estate questions
- `vercel.json`: Vercel routing config

## Setup

1. Upload this to a GitHub repo
2. Import it into [Vercel](https://vercel.com)
3. Add these environment variables in Vercel:
   - `OPENAI_API_KEY`
   - `SHEET_URL`

## Usage

Send a POST request to `/ask` with a JSON body:
```json
{ "question": "How do I buy a house?", "zip": "90210" }
```
