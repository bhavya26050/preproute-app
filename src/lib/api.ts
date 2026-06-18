import type { Test, CreateTestPayload, Question, Subject, Topic, SubTopic } from '../types';

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const LS_PREFIX = 'preproute:';

function lsKey(k: string) {
  return `${LS_PREFIX}${k}`;
}

function nowIso() {
  return new Date().toISOString();
}

function ensureSeed() {
  if (!localStorage.getItem(lsKey('subjects'))) {
    const subjects: Subject[] = [
      { id: uuidv4(), name: 'Mathematics' },
      { id: uuidv4(), name: 'Physics' },
    ];
    localStorage.setItem(lsKey('subjects'), JSON.stringify(subjects));

    const topics: Topic[] = [
      { id: uuidv4(), name: 'Algebra', subject_id: subjects[0].id },
      { id: uuidv4(), name: 'Geometry', subject_id: subjects[0].id },
    ];
    localStorage.setItem(lsKey('topics'), JSON.stringify(topics));

    const subTopics: SubTopic[] = [
      { id: uuidv4(), name: 'Linear Equations', topic_id: topics[0].id },
    ];
    localStorage.setItem(lsKey('subTopics'), JSON.stringify(subTopics));

    localStorage.setItem(lsKey('tests'), JSON.stringify([]));
    localStorage.setItem(lsKey('questions'), JSON.stringify([]));
  }
}

export const api = {
  async login({ userId, password }: { userId: string; password: string }) {
    // mock login: accept vedant-admin / vedant123 or any non-empty
    if (!userId || !password) throw new Error('Invalid credentials');
    const ok = userId === 'vedant-admin' && password === 'vedant123';
    const token = ok ? `mock-token-${uuidv4()}` : `guest-token-${uuidv4()}`;
    // return user object
    return { success: true, data: { token, user: { id: uuidv4(), userId } } };
  },

  async getSubjects(): Promise<Subject[]> {
    ensureSeed();
    return JSON.parse(localStorage.getItem(lsKey('subjects')) || '[]');
  },

  async getTopicsBySubject(subjectId: string): Promise<Topic[]> {
    ensureSeed();
    const topics: Topic[] = JSON.parse(localStorage.getItem(lsKey('topics')) || '[]');
    return topics.filter((t) => t.subject_id === subjectId);
  },

  async getSubTopicsByTopic(topicId: string): Promise<SubTopic[]> {
    ensureSeed();
    const subs: SubTopic[] = JSON.parse(localStorage.getItem(lsKey('subTopics')) || '[]');
    return subs.filter((s) => s.topic_id === topicId);
  },

  async getTests(): Promise<Test[]> {
    ensureSeed();
    return JSON.parse(localStorage.getItem(lsKey('tests')) || '[]');
  },

  async createTest(payload: CreateTestPayload): Promise<Test> {
    ensureSeed();
    const tests: Test[] = JSON.parse(localStorage.getItem(lsKey('tests')) || '[]');
    const t: Test = {
      id: uuidv4(),
      ...payload,
      status: payload.status ?? 'draft',
      created_at: nowIso(),
      questions: [],
    };
    tests.push(t);
    localStorage.setItem(lsKey('tests'), JSON.stringify(tests));
    return t;
  },

  async updateTest(id: string, patch: Partial<Test>): Promise<Test> {
    ensureSeed();
    const tests: Test[] = JSON.parse(localStorage.getItem(lsKey('tests')) || '[]');
    const idx = tests.findIndex((x) => x.id === id);
    if (idx === -1) throw new Error('Test not found');
    tests[idx] = { ...tests[idx], ...patch };
    localStorage.setItem(lsKey('tests'), JSON.stringify(tests));
    return tests[idx];
  },

  async deleteTest(id: string) {
    ensureSeed();
    let tests: Test[] = JSON.parse(localStorage.getItem(lsKey('tests')) || '[]');
    tests = tests.filter((t) => t.id !== id);
    localStorage.setItem(lsKey('tests'), JSON.stringify(tests));
    return { success: true };
  },

  async getTestById(id: string): Promise<Test | null> {
    ensureSeed();
    const tests: Test[] = JSON.parse(localStorage.getItem(lsKey('tests')) || '[]');
    return tests.find((t) => t.id === id) ?? null;
  },

  async bulkCreateQuestions(questions: Question[]) {
    ensureSeed();
    const stored: Question[] = JSON.parse(localStorage.getItem(lsKey('questions')) || '[]');
    const tests: Test[] = JSON.parse(localStorage.getItem(lsKey('tests')) || '[]');
    const created: Question[] = questions.map((q) => ({ ...q, id: uuidv4() }));
    const newAll = stored.concat(created);
    localStorage.setItem(lsKey('questions'), JSON.stringify(newAll));

    // attach question ids to tests
    created.forEach((q) => {
      if (!q.test_id) return;
      const ti = tests.findIndex((t) => t.id === q.test_id);
      if (ti !== -1) {
        tests[ti].questions = tests[ti].questions || [];
        tests[ti].questions!.push(q.id);
      }
    });
    localStorage.setItem(lsKey('tests'), JSON.stringify(tests));
    return { success: true, data: created };
  },

  async getQuestionsByTest(testId: string): Promise<Question[]> {
    ensureSeed();
    const all: Question[] = JSON.parse(localStorage.getItem(lsKey('questions')) || '[]');
    return all.filter((q) => q.test_id === testId);
  },
};
