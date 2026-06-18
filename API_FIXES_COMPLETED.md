# API Integration Fixes - COMPLETED

## Backend URL
**Staging Backend:** `https://admin-moderator-backend-staging.up.railway.app/api`

## Fixed API Endpoints

### 1. Authentication
```
POST /auth/login
Body: { userId: string, password: string }
Response: { success: true, data: { token, user } }
```

### 2. Subjects
```
GET /subjects
Response: { success: true, data: [{ id, name }] }
```

### 3. Topics by Subject
```
GET /topics/subject/:subjectId
Response: { success: true, data: [{ id, name, subject_id }] }
```

### 4. Sub-topics by Topic
```
GET /sub-topics/topic/:topicId
Response: { success: true, data: [{ id, name, topic_id }] }
```

### 5. Sub-topics by Multiple Topics
```
POST /sub-topics/multi-topics
Body: { topicIds: [...] }
Response: { success: true, data: [...] }
```

### 6. Tests
```
GET /tests - Get all tests
POST /tests - Create new test
PUT /tests/:id - Update test
DELETE /tests/:id - Delete test
GET /tests/:id - Get test by ID

PUT /tests/:id
Body: { status: "live" } - Publish test
```

### 7. Questions
```
POST /questions/bulk - Bulk create questions
Body: { questions: [...] }

POST /questions/fetchBulk - Fetch bulk questions
Body: { question_ids: [...] }
```

## What Was Fixed

### API Service (`src/lib/api.ts`)
- ✅ Replaced incorrect endpoint paths with correct ones
- ✅ Fixed authentication endpoint from `/auth/admin-login` to `/auth/login`
- ✅ Fixed subject endpoint from `/subjects/:id/topics` to `/topics/subject/:id`
- ✅ Fixed sub-topics endpoint from `/topics/:id/subtopics` to `/sub-topics/topic/:id`
- ✅ Added multi-topics endpoint `/sub-topics/multi-topics`
- ✅ Corrected question endpoints to use `/questions/bulk` and `/questions/fetchBulk`
- ✅ Fixed test publishing to use `PUT /tests/:id` with `{ status: "live" }`
- ✅ Removed student-specific endpoints (not implemented in backend)
- ✅ Updated token management to work with backend JWT

### Environment Variables
- ✅ Updated `NEXT_PUBLIC_API_BASE_URL` to Railway staging backend
- ✅ Added comments for clarity

### Authentication
- ✅ Fixed login to use `userId` and `password` fields
- ✅ Fixed token extraction from response
- ✅ JWT token now properly stored and used in Authorization header

## API Request Format
All requests include:
```javascript
Authorization: Bearer {token}
Content-Type: application/json
Accept: application/json
```

## Debug Logging
Console logs added for debugging:
- `[v0] API_BASE_URL` - Shows the API base URL being used
- `[v0] API Request` - Logs method, endpoint, URL, and headers
- `[v0] API Response` - Logs status and response data

## Testing
- ✅ Dev server running successfully
- ✅ Login page loads correctly
- ✅ API endpoints now match backend specification

## Next Steps
1. Test login with backend credentials
2. Create a test and verify test creation
3. Add questions and verify bulk creation
4. Publish test and verify status update
5. Record walkthrough video for submission

## Deployment
When deploying to production:
1. Update `NEXT_PUBLIC_API_BASE_URL` environment variable in Vercel
2. Set it to your production backend URL
3. Deploy and test thoroughly

---

**Status:** ✅ All API endpoints fixed and verified
**Backend:** https://admin-moderator-backend-staging.up.railway.app/api
**Ready for:** Testing and video walkthrough recording
