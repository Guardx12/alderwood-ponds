# Alderwood Ponds site

Fresh Next.js build for Vercel.

## Deploy notes

Use a fresh GitHub repo if possible, or delete the old repo contents before uploading this version. Earlier build failures were caused by leftover files in the old repo.

## Environment variable for George

Add this in Vercel:

- `OPENAI_API_KEY`

George uses:
- `/api/george`
- `/api/george/speak`
- `/api/george/transcribe`
