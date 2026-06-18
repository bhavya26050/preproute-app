import type { Test, CreateTestPayload, Question, Subject, Topic, SubTopic } from '../types';

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api';

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
  data?: any,
  isFormData: boolean = false
) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = getAuthToken();
  
  const headers: any = {
    'Accept': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  let body = undefined;
  if (data) {
    if (isFormData) {
      body = data; // FormData object
    } else {
      body = JSON.stringify(data);
      headers['Content-Type'] = 'application/json';
    }
  }

  const fetchOptions: any = {
    method,
    headers: isFormData ? { 'Authorization': token ? `Bearer ${token}` : '' } : headers,
  };

  if (body) {
    fetchOptions.body = body;
  }

  const response = await fetch(url, fetchOptions);

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: response.statusText }));
    throw new Error(error.message || `API Error: ${response.status}`);
  }

  return response.json();
};

export const api = {
  async login({ userId, password }: { userId: string; password: string }) {
    const response = await apiRequest('POST', '/auth/admin-login', { 
      email: userId, 
      password 
    });
    if (response.data?.token) {
      setAuthToken(response.data.token);
    }
    return response;
  },

  async loginStudent({ email, testCode }: { email: string; testCode: string }) {
    const response = await apiRequest('POST', '/auth/student-login', { 
      email, 
      test_code: testCode 
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

  async getSubjects(): Promise<Subject[]> {
    const response = await apiRequest('GET', '/subjects');
    return response.data || [];
  },

  async getTopicsBySubject(subjectId: string): Promise<Topic[]> {
    const response = await apiRequest('GET', `/subjects/${subjectId}/topics`);
    return response.data || [];
  },

  async getSubTopicsByTopic(topicId: string): Promise<SubTopic[]> {
    const response = await apiRequest('GET', `/topics/${topicId}/subtopics`);
    return response.data || [];
  },

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
    } catch {
      return null;
    }
  },

  async publishTest(id: string): Promise<Test> {
    const response = await apiRequest('POST', `/tests/${id}/publish`, {});
    return response.data;
  },

  async previewTest(id: string): Promise<Test> {
    const response = await apiRequest('GET', `/tests/${id}/preview`);
    return response.data;
  },

  async bulkCreateQuestions(questions: Question[]) {
    if (!questions.length) return { success: true, data: [] };
    
    const testId = questions[0].test_id;
    const response = await apiRequest('POST', `/tests/${testId}/questions/bulk`, { questions });
    return { success: true, data: response.data || [] };
  },

  async getQuestionsByTest(testId: string): Promise<Question[]> {
    const response = await apiRequest('GET', `/tests/${testId}/questions`);
    return response.data || [];
  },

  async addQuestion(testId: string, question: Question): Promise<Question> {
    const response = await apiRequest('POST', `/tests/${testId}/questions`, question);
    return response.data;
  },

  async updateQuestion(testId: string, questionId: string, data: Partial<Question>): Promise<Question> {
    const response = await apiRequest('PUT', `/tests/${testId}/questions/${questionId}`, data);
    return response.data;
  },

  async deleteQuestion(testId: string, questionId: string) {
    return apiRequest('DELETE', `/tests/${testId}/questions/${questionId}`);
  },

  async uploadQuestionImage(testId: string, questionId: string, file: File) {
    const formData = new FormData();
    formData.append('image', file);
    const token = getAuthToken();
    
    const response = await fetch(
      `${API_BASE_URL}/tests/${testId}/questions/${questionId}/image`,
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
    const token = getAuthToken();
    
    const response = await fetch(
      `${API_BASE_URL}/tests/${testId}/questions/import-csv`,
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

  async getStudentTests(testCode?: string) {
    const endpoint = testCode ? `/student/tests?code=${testCode}` : '/student/tests';
    const response = await apiRequest('GET', endpoint);
    return response.data || [];
  },

  async submitStudentAnswer(testId: string, questionId: string, answerId: string) {
    const response = await apiRequest('POST', `/student/tests/${testId}/answer`, {
      question_id: questionId,
      selected_answer_id: answerId,
    });
    return response.data;
  },

  async submitTest(testId: string) {
    const response = await apiRequest('POST', `/student/tests/${testId}/submit`, {});
    return response.data;
  },

  async getTestResult(testId: string) {
    const response = await apiRequest('GET', `/student/tests/${testId}/result`);
    return response.data;
  },
};
