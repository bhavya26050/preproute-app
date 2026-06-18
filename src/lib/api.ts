import type { Test, CreateTestPayload, Question, Subject, Topic, SubTopic } from '../types';

// API Configuration - Using the staging backend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://admin-moderator-backend-staging.up.railway.app/api';

console.log('[v0] API_BASE_URL:', API_BASE_URL);

// Token management
const getAuthToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('auth_token');
  }
  return null;
};

const setAuthToken = (token: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('auth_token', token);
  }
};

const clearAuthToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth_token');
  }
};

// Helper function for API requests
const apiRequest = async (
  method: string,
  endpoint: string,
  data?: any
) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = getAuthToken();
  
  const headers: any = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  let body = undefined;
  if (data) {
    body = JSON.stringify(data);
  }

  const fetchOptions: any = {
    method,
    headers,
  };

  if (body) {
    fetchOptions.body = body;
  }

  console.log('[v0] API Request:', { method, endpoint, url, headers });

  const response = await fetch(url, fetchOptions);
  const responseData = await response.json();

  console.log('[v0] API Response:', { status: response.status, data: responseData });

  if (!response.ok) {
    const error = responseData?.message || response.statusText;
    throw new Error(error || `API Error: ${response.status}`);
  }

  return responseData;
};

export const api = {
  // Authentication
  async login({ userId, password }: { userId: string; password: string }) {
    const response = await apiRequest('POST', '/auth/login', { 
      userId, 
      password 
    });
    if (response.data?.token) {
      setAuthToken(response.data.token);
    }
    return response;
  },

  async logout() {
    clearAuthToken();
    return { success: true };
  },

  // Subjects
  async getSubjects(): Promise<Subject[]> {
    const response = await apiRequest('GET', '/subjects');
    return response.data || [];
  },

  // Topics
  async getTopicsBySubject(subjectId: string): Promise<Topic[]> {
    const response = await apiRequest('GET', `/topics/subject/${subjectId}`);
    return response.data || [];
  },

  // Sub-topics
  async getSubTopicsByTopic(topicId: string): Promise<SubTopic[]> {
    const response = await apiRequest('GET', `/sub-topics/topic/${topicId}`);
    return response.data || [];
  },

  async getSubTopicsByMultipleTopics(topicIds: string[]): Promise<SubTopic[]> {
    const response = await apiRequest('POST', '/sub-topics/multi-topics', { topicIds });
    return response.data || [];
  },

  // Tests
  async getTests(): Promise<Test[]> {
    const response = await apiRequest('GET', '/tests');
    return response.data || [];
  },

  async createTest(payload: CreateTestPayload): Promise<Test> {
    const response = await apiRequest('POST', '/tests', payload);
    return response.data;
  },

  async updateTest(id: string, patch: Partial<Test>): Promise<Test> {
    const response = await apiRequest('PUT', `/tests/${id}`, patch);
    return response.data;
  },

  async deleteTest(id: string) {
    return apiRequest('DELETE', `/tests/${id}`);
  },

  async getTestById(id: string): Promise<Test | null> {
    try {
      const response = await apiRequest('GET', `/tests/${id}`);
      return response.data || null;
    } catch (err) {
      console.error('[v0] Error fetching test:', err);
      return null;
    }
  },

  async publishTest(id: string): Promise<Test> {
    const response = await apiRequest('PUT', `/tests/${id}`, { status: 'live' });
    return response.data;
  },

  // Questions
  async bulkCreateQuestions(questions: Question[]) {
    if (!questions.length) return { success: true, data: [] };
    
    const response = await apiRequest('POST', '/questions/bulk', { questions });
    return { success: true, data: response.data || [] };
  },

  async getQuestionsByTest(testId: string): Promise<Question[]> {
    const response = await apiRequest('GET', `/tests/${testId}`);
    const test = response.data;
    // Questions might be embedded in test response
    if (test?.questions && Array.isArray(test.questions)) {
      return test.questions;
    }
    return [];
  },

  async addQuestion(testId: string, question: Question): Promise<Question> {
    // Create single question by wrapping it in bulk endpoint
    const response = await apiRequest('POST', '/questions/bulk', { 
      questions: [{ ...question, test_id: testId }] 
    });
    return response.data?.[0] || question;
  },

  async updateQuestion(testId: string, questionId: string, data: Partial<Question>): Promise<Question> {
    const response = await apiRequest('PUT', `/questions/${questionId}`, data);
    return response.data;
  },

  async deleteQuestion(testId: string, questionId: string) {
    return apiRequest('DELETE', `/questions/${questionId}`);
  },

  async fetchBulkQuestions(questionIds: string[]): Promise<Question[]> {
    const response = await apiRequest('POST', '/questions/fetchBulk', { question_ids: questionIds });
    return response.data || [];
  },

  // File uploads
  async uploadQuestionImage(testId: string, questionId: string, file: File) {
    const formData = new FormData();
    formData.append('image', file);
    const token = getAuthToken();
    
    const response = await fetch(
      `${API_BASE_URL}/questions/${questionId}/image`,
      {
        method: 'POST',
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
        },
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error('Failed to upload image');
    }

    return response.json();
  },

  async importQuestionsCSV(testId: string, file: File) {
    const formData = new FormData();
    formData.append('csv_file', file);
    formData.append('test_id', testId);
    const token = getAuthToken();
    
    const response = await fetch(
      `${API_BASE_URL}/questions/import-csv`,
      {
        method: 'POST',
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
        },
        body: formData,
      }
    );

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: response.statusText }));
      throw new Error(error.message || 'Failed to import CSV');
    }

    return response.json();
  },
};
