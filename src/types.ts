export type UUID = string;

export type Subject = { id: UUID; name: string };
export type Topic = { id: UUID; name: string; subject_id: UUID };
export type SubTopic = { id: UUID; name: string; topic_id: UUID };

export type Question = {
  id: UUID;
  type: 'mcq';
  question: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  correct_option: string;
  explanation?: string;
  difficulty?: string;
  topic_id?: UUID;
  sub_topic_id?: UUID;
  media_url?: string;
  test_id?: UUID;
};

export type Test = {
  id: UUID;
  name: string;
  type?: string;
  subject?: UUID | string;
  topics?: UUID[] | string[];
  sub_topics?: UUID[] | string[];
  correct_marks?: number;
  wrong_marks?: number;
  unattempt_marks?: number;
  difficulty?: string;
  total_time?: number;
  total_marks?: number;
  total_questions?: number;
  status?: 'draft' | 'live' | null;
  created_at?: string;
  questions?: UUID[];
};

export type CreateTestPayload = Omit<Test, 'id' | 'created_at' | 'questions'>;
