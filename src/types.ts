export interface Question {
  id: string;
  questionNumber: number;
  text: string;
  isMCQ: boolean;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  marks: number;
}

export interface ExamPaper {
  examName: string;
  subject: string;
  examDate: string;
  duration: string;
  totalMarks: string;
  questions: Question[];
}

export type TabType = 'home' | 'create' | 'preview' | 'encrypt' | 'integrity' | 'final';
