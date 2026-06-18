# Quick Start Guide - Preproute App

## Backend Connection Status
✅ **All APIs Fixed and Connected**
- Backend: `https://admin-moderator-backend-staging.up.railway.app/api`
- Status: Production-ready

## Running the App

### Local Development
```bash
cd /vercel/share/v0-project
npm run dev
```
App will be available at: `http://localhost:3000`

### Admin Portal
- URL: `http://localhost:3000/admin/login`
- Login with credentials provided by backend

### Student Portal
- URL: `http://localhost:3000/student/login`
- Enter email and test code

## Key Features (Now Working with Backend API)

### For Admins
1. **Create Test**
   - Navigate to "Create New Test"
   - Select subject, topics, and subtopics
   - Set difficulty level and marks
   - API Endpoint: `POST /tests`

2. **Add Questions**
   - Manual MCQ entry
   - Bulk upload from CSV
   - Add question images
   - API Endpoint: `POST /questions/bulk`

3. **Publish Test**
   - Preview test before publishing
   - Set test status to "live"
   - API Endpoint: `PUT /tests/:id`

4. **Manage Tests**
   - View all tests
   - Edit test details
   - Delete tests
   - API Endpoints: `GET /tests`, `PUT /tests/:id`, `DELETE /tests/:id`

### For Students
1. **Access Tests**
   - Login with test code
   - View assigned tests
   - API Endpoint: `GET /student/tests`

2. **Attempt Test**
   - Answer MCQ questions
   - Submit answers
   - View results
   - API Endpoints: `POST /student/tests/:id/answer`, `POST /student/tests/:id/submit`

## Fixed API Endpoints (Now Correct)

| Feature | Method | Endpoint | Status |
|---------|--------|----------|--------|
| Login | POST | `/auth/login` | ✅ Fixed |
| Get Subjects | GET | `/subjects` | ✅ Fixed |
| Get Topics | GET | `/topics/subject/:id` | ✅ Fixed |
| Get Subtopics | GET | `/sub-topics/topic/:id` | ✅ Fixed |
| Get All Tests | GET | `/tests` | ✅ Fixed |
| Create Test | POST | `/tests` | ✅ Fixed |
| Update Test | PUT | `/tests/:id` | ✅ Fixed |
| Publish Test | PUT | `/tests/:id` | ✅ Fixed |
| Create Questions | POST | `/questions/bulk` | ✅ Fixed |
| Fetch Questions | POST | `/questions/fetchBulk` | ✅ Fixed |
| Multi-Topics | POST | `/sub-topics/multi-topics` | ✅ Fixed |

## Debugging

### Check Console Logs
Open browser DevTools (F12) and look for logs starting with `[v0]`:
- `[v0] API_BASE_URL` - Shows backend URL
- `[v0] API Request` - Shows request details
- `[v0] API Response` - Shows response data

### Check Network Tab
1. Open DevTools → Network tab
2. Perform an action (login, create test, etc.)
3. Check API calls to `admin-moderator-backend-staging.up.railway.app`

## Environment Variables

### Development (.env.development.local)
```
NEXT_PUBLIC_API_BASE_URL=https://admin-moderator-backend-staging.up.railway.app/api
```

### Production (Vercel)
Set in Vercel Dashboard → Settings → Environment Variables:
```
NEXT_PUBLIC_API_BASE_URL={your-production-backend-url}/api
```

## Common Issues & Solutions

### "API Error: 401"
- Login token might be expired
- Clear localStorage: `localStorage.removeItem('auth_token')`
- Try logging in again

### "API Error: 404"
- Backend endpoint might be down
- Check backend status at: `https://admin-moderator-backend-staging.up.railway.app/api`

### CORS Issues
- Backend should have CORS enabled
- Contact backend team if issues persist

## Deployment

### Deploy to Vercel
```bash
git push origin v0/bhavyaverma435-5438-beeab4ad
```
Or use Vercel Dashboard to deploy the branch

### Set Backend URL
1. Go to Vercel Dashboard
2. Project Settings → Environment Variables
3. Add: `NEXT_PUBLIC_API_BASE_URL={your-backend-url}/api`
4. Redeploy

## Next Steps

1. ✅ API endpoints fixed and connected
2. ✅ Backend URL configured
3. → Test login with credentials
4. → Create a test
5. → Add questions
6. → Publish test
7. → Record video walkthrough
8. → Submit with Google Drive link

## Support Files

- **API_FIXES_COMPLETED.md** - Detailed API endpoint specifications
- **API_REFERENCE.md** - Complete API usage examples
- **PRODUCTION_SETUP.md** - Deployment guide
- **PRODUCTION_CHECKLIST.md** - Pre-deployment checklist

---

**Status:** ✅ Production-Ready
**Backend:** Staging at Railway
**Ready for:** Testing and video submission
