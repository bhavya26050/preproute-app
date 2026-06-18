# API Integration Reference

## How the API Service Works

The application uses a centralized API service in `src/lib/api.ts` that handles all communication with your backend.

## Token Management

### Automatic Token Handling

```javascript
// After login, token is automatically stored
localStorage.setItem('auth_token', response.data.token);

// For all subsequent requests, token is automatically added
headers['Authorization'] = `Bearer ${token}`;

// On logout, token is cleared
localStorage.removeItem('auth_token');
```

## Making API Calls

### Example: Login

```javascript
const response = await api.login({ 
  userId: 'admin@example.com', 
  password: 'password' 
});

// Response:
// {
//   success: true,
//   data: { 
//     token: "eyJhbGciOiJIUzI1NiIs...",
//     user: { id: "123", email: "admin@example.com" }
//   }
// }
```

### Example: Get Tests

```javascript
const tests = await api.getTests();

// Returns array of tests:
// [
//   {
//     id: "test-123",
//     name: "Math Final",
//     subject: "Mathematics",
//     status: "draft",
//     created_at: "2024-01-15T10:30:00Z"
//   }
// ]
```

### Example: Create Test

```javascript
const newTest = await api.createTest({
  name: 'Physics Quiz',
  type: 'practice',
  subject: 'physics-id',
  topics: ['topic-1', 'topic-2'],
  total_time: 60,
  total_marks: 100,
  correct_marks: 4,
  wrong_marks: -1,
  unattempt_marks: 0
});

// Returns:
// {
//   id: "test-456",
//   name: "Physics Quiz",
//   ...rest of test data
// }
```

## Error Handling Pattern

### In Components

```javascript
const [loading, setLoading] = useState(false);
const [error, setError] = useState('');

async function handleOperation() {
  try {
    setLoading(true);
    setError('');
    
    const result = await api.someOperation();
    
    // Handle success
    updateUI(result);
  } catch (err) {
    // Handle error
    setError(err.message || 'Operation failed');
  } finally {
    setLoading(false);
  }
}

// In JSX:
return (
  <div>
    {error && <div className="error">{error}</div>}
    <button disabled={loading}>
      {loading ? 'Loading...' : 'Submit'}
    </button>
  </div>
);
```

## API Methods

### Authentication

```javascript
// Admin login
await api.login({ userId: string, password: string })

// Student login
await api.loginStudent({ email: string, testCode: string })

// Logout
await api.logout()
```

### Tests

```javascript
// List all tests
await api.getTests()

// Get specific test
await api.getTestById(testId: string)

// Create test
await api.createTest(payload: CreateTestPayload)

// Update test
await api.updateTest(testId: string, patch: Partial<Test>)

// Delete test
await api.deleteTest(testId: string)

// Publish test
await api.publishTest(testId: string)

// Preview test
await api.previewTest(testId: string)
```

### Questions

```javascript
// Get questions for test
await api.getQuestionsByTest(testId: string)

// Add single question
await api.addQuestion(testId: string, question: Question)

// Add multiple questions
await api.bulkCreateQuestions(questions: Question[])

// Update question
await api.updateQuestion(testId: string, questionId: string, data: Partial<Question>)

// Delete question
await api.deleteQuestion(testId: string, questionId: string)

// Upload image to question
await api.uploadQuestionImage(testId: string, questionId: string, file: File)

// Import questions from CSV
await api.importQuestionsCSV(testId: string, file: File)
```

### Subjects & Topics

```javascript
// Get all subjects
await api.getSubjects()

// Get topics for subject
await api.getTopicsBySubject(subjectId: string)

// Get subtopics for topic
await api.getSubTopicsByTopic(topicId: string)
```

### Student Features

```javascript
// Get available tests
await api.getStudentTests(testCode?: string)

// Submit answer
await api.submitStudentAnswer(testId: string, questionId: string, answerId: string)

// Submit entire test
await api.submitTest(testId: string)

// Get test result
await api.getTestResult(testId: string)
```

## Request/Response Examples

### Create Test Request

```javascript
POST /tests
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
Content-Type: application/json

{
  "name": "Physics Final Exam",
  "type": "exam",
  "subject": "physics-123",
  "topics": ["mechanics-456", "waves-789"],
  "total_time": 120,
  "total_marks": 100,
  "correct_marks": 4,
  "wrong_marks": -1,
  "unattempt_marks": 0
}
```

### Create Test Response

```json
{
  "success": true,
  "data": {
    "id": "test-789",
    "name": "Physics Final Exam",
    "type": "exam",
    "subject": "physics-123",
    "status": "draft",
    "total_time": 120,
    "total_marks": 100,
    "created_at": "2024-01-15T10:30:00Z",
    "questions": []
  }
}
```

### Add Question Request

```javascript
POST /tests/test-789/questions
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
Content-Type: application/json

{
  "text": "What is Newton's first law?",
  "options": [
    {"text": "Option A", "isCorrect": true},
    {"text": "Option B", "isCorrect": false},
    {"text": "Option C", "isCorrect": false},
    {"text": "Option D", "isCorrect": false}
  ],
  "difficulty": "medium",
  "topic_id": "mechanics-456",
  "sub_topic_id": "forces-123"
}
```

### Error Response

```json
{
  "success": false,
  "message": "Unauthorized: Invalid token",
  "status": 401
}
```

## Usage in Components

### Dashboard Component

```javascript
"use client";
import { api } from '@/lib/api';

export default function Dashboard() {
  const [tests, setTests] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    loadTests();
  }, []);

  async function loadTests() {
    try {
      const data = await api.getTests();
      setTests(data);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div>
      {error && <p className="error">{error}</p>}
      {tests.map(test => (
        <div key={test.id}>
          <h3>{test.name}</h3>
          <p>Status: {test.status}</p>
        </div>
      ))}
    </div>
  );
}
```

### Form Component

```javascript
async function handleSubmit(e) {
  e.preventDefault();
  
  try {
    setLoading(true);
    const newTest = await api.createTest({
      name: formData.name,
      type: formData.type,
      subject: formData.subject,
      // ... other fields
    });
    
    router.push(`/tests/${newTest.id}/questions`);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
}
```

## Testing API Endpoints

### Using curl

```bash
# Login
curl -X POST http://localhost:8000/api/auth/admin-login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@test.com","password":"password"}' \
  -s | jq .

# Get tests (replace TOKEN with actual token)
curl -X GET http://localhost:8000/api/tests \
  -H "Authorization: Bearer TOKEN" \
  -s | jq .

# Create test
curl -X POST http://localhost:8000/api/tests \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Test Name",
    "type":"practice",
    "subject":"123",
    "total_time":60,
    "total_marks":100,
    "correct_marks":4,
    "wrong_marks":-1,
    "unattempt_marks":0
  }' \
  -s | jq .
```

### Using Postman

1. Create POST request to `/auth/admin-login`
2. Set body to JSON with credentials
3. Copy token from response
4. Use token in Authorization header for other requests
5. Select "Bearer Token" as auth type

## Common Patterns

### Loading Data on Mount

```javascript
useEffect(() => {
  async function fetch() {
    try {
      const data = await api.getSubjects();
      setSubjects(data);
    } catch (err) {
      console.error('Failed to load subjects:', err);
    }
  }
  fetch();
}, []);
```

### Handling Async Operations

```javascript
async function handleDelete(id) {
  if (!confirm('Are you sure?')) return;
  
  try {
    setDeleting(true);
    await api.deleteTest(id);
    refresh(); // Reload list
  } catch (err) {
    setError(err.message);
  } finally {
    setDeleting(false);
  }
}
```

### File Uploads

```javascript
async function handleImageUpload(file) {
  try {
    const result = await api.uploadQuestionImage(testId, questionId, file);
    return result.imageUrl;
  } catch (err) {
    console.error('Upload failed:', err);
  }
}
```

## Environment Variable Configuration

### Development (.env.development.local)
```
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
```

### Production (Vercel Environment Variables)
```
NEXT_PUBLIC_API_BASE_URL=https://api.production.com/api
```

The API service automatically uses the configured base URL for all requests.

## Debugging

### Check Token

```javascript
// In browser console
localStorage.getItem('auth_token')
```

### Check API Calls

```javascript
// Add to api.ts for debugging
console.log('[API] Request:', method, endpoint, data);
console.log('[API] Response:', response);
```

### Network Tab

1. Open DevTools (F12)
2. Go to Network tab
3. Make API request
4. Click request and check:
   - Headers (Authorization token)
   - Preview (Response data)
   - Response (Error details)

## Troubleshooting

### "API Error: 401 Unauthorized"
- Token expired or invalid
- Re-login to get new token
- Clear localStorage and try again

### "API Error: 404 Not Found"
- Endpoint path is wrong
- Resource doesn't exist
- Check API documentation

### "Failed to fetch"
- Network connectivity issue
- CORS error (check backend CORS headers)
- API base URL is incorrect
- Backend is not running

### CORS Error
- Backend must set `Access-Control-Allow-Origin`
- Include credentials if needed
- Check preflight requests (OPTIONS)
