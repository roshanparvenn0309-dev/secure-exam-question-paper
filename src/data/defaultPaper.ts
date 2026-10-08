import { ExamPaper } from '../types';

export const initialExamPaper: ExamPaper = {
  examName: 'College Examination',
  subject: 'Cyber Security',
  examDate: '06 October 2026',
  duration: '3 Hours',
  totalMarks: '50',
  questions: [
    {
      id: 'q-1',
      questionNumber: 1,
      text: 'What is cryptography?',
      isMCQ: true,
      options: {
        A: 'The practice of securing information by transforming it into an unreadable format.',
        B: 'A programming language used for database management.',
        C: 'A hardware component that connects computers over a network.',
        D: 'A method to compress large files for storage efficiency.'
      },
      marks: 10
    },
    {
      id: 'q-2',
      questionNumber: 2,
      text: 'What is hashing in cyber security?',
      isMCQ: true,
      options: {
        A: 'Converting data into a fixed-length string to verify integrity.',
        B: 'A two-way algorithm used to decrypt hidden passwords.',
        C: 'A physical lock mechanism used in server rooms.',
        D: 'A protocol for sending emails across local networks.'
      },
      marks: 10
    },
    {
      id: 'q-3',
      questionNumber: 3,
      text: 'What is the primary objective of data encryption?',
      isMCQ: true,
      options: {
        A: 'To protect readable data from unauthorized viewing and tampering.',
        B: 'To increase the download speed of files on the internet.',
        C: 'To delete confidential records permanently after reading.',
        D: 'To format disks into secure partition tables.'
      },
      marks: 10
    }
  ]
};
