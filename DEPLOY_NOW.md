# Deploy to Vercel - Quick Start

## Prerequisites
- Backend API is running and accessible
- Your backend API URL (e.g., https://api.example.com/api)

## 5-Minute Deployment

### Step 1: Configure Environment Variables

Before deploying, set your backend API URL:

1. Go to: https://vercel.com/dashboard
2. Select your Preproute project
3. Click Settings
4. Go to Environment Variables
5. Click "Add"
6. Enter:
   - **Name:** `NEXT_PUBLIC_API_BASE_URL`
   - **Value:** `https://your-api-domain.com/api` (your actual backend URL)
   - **Environments:** Select Production
7. Click Save

### Step 2: Deploy

#### Option A: Push to GitHub (Automatic)
```bash
git push origin test-management-application
```
Vercel will automatically deploy on push.

#### Option B: Use Vercel CLI
```bash
npm install -g vercel
vercel --prod
```

### Step 3: Wait for Deployment

Vercel will show build progress. Wait for:
```
✓ Build completed
✓ Ready on https://preproute-app.vercel.app
```

### Step 4: Test Your Deployment

1. Open your deployed URL (shown by Vercel)
2. Click "Admin Login"
3. Enter your credentials
4. Create a test
5. Add questions
6. Verify everything works

## Troubleshooting

### API Connection Issues

**Error:** "Failed to load tests"

**Solution:**
1. Verify `NEXT_PUBLIC_API_BASE_URL` is set correctly
2. Check backend API is running
3. Test API directly: `curl https://your-api/api/tests`
4. Check CORS headers on backend

**Error:** "Invalid credentials"

**Solution:**
1. Verify email/password are correct
2. Check backend authentication is working
3. Test with Postman or curl first

### Build Fails

**Solution:**
1. Check for TypeScript errors locally: `npm run build`
2. Verify all dependencies installed: `npm install`
3. Check Node version matches: `node -v` (should be 18+)

## After Deployment

### Record Walkthrough Video

Record a video demonstrating:
1. Login with admin credentials
2. Create new test
3. Add MCQ questions manually
4. Upload CSV with questions
5. Set difficulty, topic, subtopic
6. Show formatting bar
7. Add image to question
8. Preview test
9. Publish test
10. View published test result

### Share Results

1. Upload video to Google Drive
2. Make it shareable (anyone with link)
3. Include deployed URL in your submission

## Environment Variables Summary

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_API_BASE_URL` | Your backend API base URL |

## Important Notes

- Use `NEXT_PUBLIC_` prefix for frontend-accessible variables
- Never commit sensitive data to git
- Use Vercel dashboard to manage secrets
- Backend API must be HTTPS in production
- CORS headers must allow your frontend domain

## Next Steps

1. Set environment variable in Vercel ✓
2. Deploy to Vercel ✓
3. Test the deployed app ✓
4. Record walkthrough video ✓
5. Submit with video link ✓

## Support

Need help?
- Check Vercel logs: Dashboard → Deployments → View Logs
- Verify backend API is running
- Test API endpoints with Postman
- Review `PRODUCTION_SETUP.md` for detailed guide

---

**Ready to deploy?** Your app is production-ready! 🚀
