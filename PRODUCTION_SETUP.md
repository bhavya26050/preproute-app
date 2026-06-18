# Preproute Application - Production Setup Guide

## Overview
This guide explains how to deploy the Preproute application to production with the backend APIs.

## Prerequisites
- Node.js 18+ installed
- Backend API running and accessible
- Environment variables configured

## Environment Configuration

### Development Environment
The app reads from `.env.development.local`:
```
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
```

### Production Environment
For production deployment (e.g., on Vercel), add the environment variable:

**Variable Name:** `NEXT_PUBLIC_API_BASE_URL`
**Value:** `https://your-api-domain.com/api`

Replace `your-api-domain.com` with your actual backend API domain.

## API Integration

All API endpoints are configured in `src/lib/api.ts`. The application makes HTTP requests to:

### Authentication Endpoints
- `POST /auth/admin-login` - Admin login
- `POST /auth/student-login` - Student login
- `GET /auth/me` - Get current user

### Test Management
- `GET /tests` - List all tests
- `POST /tests` - Create new test
- `GET /tests/{id}` - Get test details
- `PUT /tests/{id}` - Update test
- `DELETE /tests/{id}` - Delete test
- `POST /tests/{id}/publish` - Publish test
- `GET /tests/{id}/preview` - Preview test

### Questions Management
- `GET /tests/{id}/questions` - List test questions
- `POST /tests/{id}/questions` - Add single question
- `POST /tests/{id}/questions/bulk` - Bulk add questions
- `PUT /tests/{id}/questions/{questionId}` - Update question
- `DELETE /tests/{id}/questions/{questionId}` - Delete question
- `POST /tests/{id}/questions/{questionId}/image` - Upload question image
- `POST /tests/{id}/questions/import-csv` - Import questions from CSV

### Topics & Subjects
- `GET /subjects` - List subjects
- `GET /subjects/{id}/topics` - List topics for subject
- `GET /topics/{id}/subtopics` - List subtopics for topic

### Student Features
- `GET /student/tests` - Get available tests
- `POST /student/tests/{id}/answer` - Submit answer
- `POST /student/tests/{id}/submit` - Submit test
- `GET /student/tests/{id}/result` - Get test result

## Authentication

The application uses JWT token-based authentication:

1. User logs in with credentials
2. Backend returns JWT token
3. Token is stored in `localStorage` as `auth_token`
4. All subsequent API requests include token in `Authorization` header: `Bearer {token}`

## Deployment Steps

### 1. Deploy to Vercel

```bash
# Install dependencies
npm install

# Build the application
npm run build

# Deploy (if using Vercel CLI)
vercel deploy --prod
```

### 2. Set Environment Variables in Vercel

1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add the following variables for **Production**:
   - Key: `NEXT_PUBLIC_API_BASE_URL`
   - Value: `https://your-api-domain.com/api`

### 3. Verify Deployment

1. Open your deployed application URL
2. Test the login flow with credentials from your backend
3. Create a test to verify API connectivity
4. Add questions and publish to ensure all features work

## Local Development

### Setup

```bash
# Install dependencies
npm install

# Set environment variables (already in .env.development.local)
# NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api

# Start the development server
npm run dev
```

### Testing

1. Navigate to http://localhost:3000
2. Use admin credentials: `vedant-admin` / `vedant123` (demo)
3. Create tests and manage questions

## Error Handling

The application includes comprehensive error handling:
- Network request errors display user-friendly messages
- Loading states prevent duplicate submissions
- Error messages appear on forms and pages
- Console logs include debug information for troubleshooting

## Performance Considerations

- API requests are optimized with proper headers
- Form submissions are prevented while loading
- Error states are managed properly
- Token management is secure and efficient

## Troubleshooting

### "API Error: 404"
- Verify backend API is running
- Check `NEXT_PUBLIC_API_BASE_URL` matches your backend URL
- Ensure API endpoints match the documented routes

### "Invalid credentials"
- Verify username/email and password are correct
- Check backend authentication system is working
- Test with API client like Postman first

### "Failed to load tests"
- Check user is authenticated (has valid token)
- Verify `/tests` endpoint is accessible
- Check network connectivity to API

## Support

For issues or questions:
1. Check error messages in browser console
2. Verify environment variables are set correctly
3. Test API endpoints directly with Postman
4. Review API logs on backend for detailed error information
