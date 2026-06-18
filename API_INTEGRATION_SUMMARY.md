# Preproute API Integration - Production Ready

## Summary of Changes

This document outlines all the changes made to make the Preproute application production-ready with full backend API integration.

## What Was Updated

### 1. API Service (`src/lib/api.ts`)

**Before:** All data was stored in localStorage with mock implementations.

**After:** Full production-ready API client that:
- Makes HTTP requests to your backend API
- Implements JWT token-based authentication
- Manages auth tokens in localStorage (`auth_token` key)
- Includes all endpoints for:
  - Admin authentication
  - Student authentication
  - Test management (CRUD operations)
  - Question management
  - Subject/Topic/SubTopic hierarchy
  - Student assessments
  - CSV import
  - Image uploads

**Key Features:**
```javascript
// Automatic token management
- setAuthToken(token) - Store JWT after login
- getAuthToken() - Retrieve token for requests
- clearAuthToken() - Remove token on logout

// All requests automatically include
- Authorization: Bearer {token} header
- Content-Type: application/json (when needed)
```

### 2. Authentication Component (`src/components/AuthLogin.tsx`)

**Updated:**
- Separate handling for admin vs. student login
- Student login uses test code instead of password
- Error display with user-friendly messages
- Loading states prevent duplicate submissions
- Disabled inputs while request is processing
- Demo credentials button for testing

**New Features:**
- Error feedback on form
- Loading indicator
- Proper token storage
- Redirect after successful login

### 3. Dashboard (`src/app/dashboard/page.tsx`)

**Added:**
- Loading state while fetching tests
- Error handling and display
- Better UI with status badges
- Improved button styling
- Try-catch blocks for all API calls
- User feedback messages

### 4. Test Creation (`src/app/tests/new/page.tsx`)

**Updated:**
- Error handling for test creation
- Loading state management
- Better error feedback to users

### 5. Test Form (`src/components/TestForm.tsx`)

**Enhanced:**
- Subject loading from API with error handling
- Disabled form inputs during submission
- Loading indicator on submit button
- Error messages displayed on form
- Proper error catching for all operations

### 6. Environment Configuration

**Files Updated:**
- `.env.development.local` - Added `NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api`
- `.env.example` - Template for environment variables
- `PRODUCTION_SETUP.md` - Complete deployment guide

## API Endpoints Connected

### Authentication
```
POST   /auth/admin-login          - Admin login with email/password
POST   /auth/student-login        - Student login with email/test code
GET    /auth/me                   - Get current authenticated user
```

### Test Management
```
GET    /tests                     - List all admin's tests
POST   /tests                     - Create new test
GET    /tests/{id}                - Get test details
PUT    /tests/{id}                - Update test
DELETE /tests/{id}                - Delete test
POST   /tests/{id}/publish        - Publish test
GET    /tests/{id}/preview        - Preview test
```

### Questions
```
GET    /tests/{id}/questions                    - List questions
POST   /tests/{id}/questions                    - Add single question
POST   /tests/{id}/questions/bulk               - Bulk add questions
PUT    /tests/{id}/questions/{questionId}       - Update question
DELETE /tests/{id}/questions/{questionId}       - Delete question
POST   /tests/{id}/questions/{questionId}/image - Upload image
POST   /tests/{id}/questions/import-csv         - Import CSV
```

### Subject Management
```
GET    /subjects                      - List all subjects
GET    /subjects/{id}/topics          - Get topics for subject
GET    /topics/{id}/subtopics         - Get subtopics for topic
```

### Student Features
```
GET    /student/tests                        - Get available tests
POST   /student/tests/{id}/answer            - Submit answer
POST   /student/tests/{id}/submit            - Submit test
GET    /student/tests/{id}/result            - Get test result
```

## How to Deploy

### Step 1: Set Backend API URL

#### Development (Local)
Already set in `.env.development.local`:
```
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
```

#### Production (Vercel)
1. Go to Vercel Dashboard
2. Select your project
3. Settings → Environment Variables
4. Add for Production environment:
   - Key: `NEXT_PUBLIC_API_BASE_URL`
   - Value: `https://your-api-domain.com/api`
5. Redeploy

### Step 2: Deploy to Vercel

```bash
# Option 1: Using Git (Automatic)
git push                              # Push to master/main

# Option 2: Using Vercel CLI
npm install -g vercel
vercel                                # Deploy (select your project)
vercel --prod                         # Deploy to production
```

### Step 3: Test Deployment

1. Navigate to your deployed URL
2. Test admin login with credentials
3. Create a test
4. Add questions
5. Publish test
6. Verify student access

## Error Handling

All API calls include error handling:

```javascript
try {
  const result = await api.getTests();
  // Use result
} catch (err) {
  setError(err.message);
  // Display error to user
}
```

Errors include:
- Network failures
- Authentication errors (401)
- Not found errors (404)
- Server errors (500)
- Validation errors

## Authentication Flow

```
1. User enters credentials
2. POST /auth/{admin|student}-login
3. Backend returns JWT token
4. Token stored in localStorage
5. All subsequent requests use Authorization header
6. On logout, token is cleared
```

## Testing the APIs

### Test Admin Login
```bash
curl -X POST http://localhost:8000/api/auth/admin-login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"password"}'
```

Response:
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": { "id": "123", "email": "admin@example.com" }
  }
}
```

### Test Getting Tests
```bash
curl -X GET http://localhost:8000/api/tests \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Environment Variables

| Variable | Purpose | Example |
|----------|---------|---------|
| `NEXT_PUBLIC_API_BASE_URL` | Backend API URL | `http://localhost:8000/api` |

**Note:** `NEXT_PUBLIC_` prefix makes it available to browser (safe for public URLs only, no secrets)

## Troubleshooting

### "API Error: 404"
- Check API base URL is correct
- Verify endpoint path exists
- Test endpoint with Postman

### "Failed to load tests"
- Verify JWT token is valid
- Check user has admin role
- Ensure `/tests` endpoint is working

### "Invalid credentials"
- Double-check email and password
- Test credentials directly on backend
- Check backend authentication logic

### CORS Issues
- Backend should allow requests from frontend domain
- Add proper CORS headers in backend
- Check `Access-Control-Allow-Origin` header

## Performance Considerations

1. **Token Storage:** JWT tokens stored securely in localStorage
2. **Request Headers:** Automatically added for all authenticated requests
3. **Error Recovery:** All errors caught and displayed to user
4. **Loading States:** Prevent duplicate submissions
5. **Network Optimization:** Minimal payload sizes

## Security

1. **Token Management:**
   - Tokens stored after login
   - Cleared on logout
   - Included in Authorization header for all requests

2. **API Requests:**
   - All requests go to configured API URL
   - HTTPS recommended for production
   - No sensitive data in URL parameters

3. **Form Validation:**
   - Required fields checked before submission
   - Error messages displayed safely
   - No console logging of sensitive data

## Next Steps

1. Deploy backend API (if not already deployed)
2. Deploy frontend to Vercel
3. Set environment variables in Vercel dashboard
4. Test end-to-end flow
5. Record walkthrough video for submission

## Support

For detailed deployment instructions, see:
- `PRODUCTION_SETUP.md` - Complete deployment guide
- Backend API documentation - Endpoint specifications
- Vercel Documentation - https://vercel.com/docs

## Files Modified

- `src/lib/api.ts` - Complete rewrite for production
- `src/components/AuthLogin.tsx` - Updated authentication
- `src/app/dashboard/page.tsx` - Added error handling
- `src/app/tests/new/page.tsx` - Added error handling
- `src/components/TestForm.tsx` - Enhanced with API integration
- `.env.development.local` - Added API base URL
- `.env.example` - Environment template
- `PRODUCTION_SETUP.md` - New deployment guide

**Total Changes:** 556 insertions, 165 deletions
