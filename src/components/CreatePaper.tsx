import React, { useState } from 'react';
import { ExamPaper, Question } from '../types';

interface CreatePaperProps {
  paper: ExamPaper;
  onSavePaper: (updatedPaper: ExamPaper) => void;
}

export const CreatePaper: React.FC<CreatePaperProps> = ({ paper, onSavePaper }) => {
  const [examName, setExamName] = useState(paper.examName);
  const [subject, setSubject] = useState(paper.subject);
  const [examDate, setExamDate] = useState(paper.examDate);
  const [duration, setDuration] = useState(paper.duration);
  const [totalMarks, setTotalMarks] = useState(paper.totalMarks);
  const [questions, setQuestions] = useState<Question[]>(paper.questions);

  // New/Editing question state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [questionText, setQuestionText] = useState('');
  const [isMCQ, setIsMCQ] = useState(true);
  const [optA, setOptA] = useState('');
  const [optB, setOptB] = useState('');
  const [optC, setOptC] = useState('');
  const [optD, setOptD] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleStartEdit = (q: Question) => {
    setEditingId(q.id);
    setQuestionText(q.text);
    setIsMCQ(q.isMCQ);
    setOptA(q.options.A || '');
    setOptB(q.options.B || '');
    setOptC(q.options.C || '');
    setOptD(q.options.D || '');
    setErrorMsg('');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setQuestionText('');
    setOptA('');
    setOptB('');
    setOptC('');
    setOptD('');
    setErrorMsg('');
  };

  const handleDelete = (id: string) => {
    if (questions.length <= 1) {
      setErrorMsg('A question paper must have at least 1 question.');
      return;
    }
    const updated = questions.filter(q => q.id !== id);
    setQuestions(updated);
    if (editingId === id) {
      handleCancelEdit();
    }
  };

  const handleAddOrUpdateQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText.trim()) {
      setErrorMsg('Please enter question text.');
      return;
    }

    if (isMCQ && (!optA.trim() || !optB.trim() || !optC.trim() || !optD.trim())) {
      setErrorMsg('Please enter all 4 options (A, B, C, D) for the multiple choice question.');
      return;
    }

    setErrorMsg('');

    if (editingId) {
      // Update existing question
      setQuestions(prev =>
        prev.map(q => {
          if (q.id === editingId) {
            return {
              ...q,
              text: questionText.trim(),
              isMCQ,
              options: {
                A: optA.trim(),
                B: optB.trim(),
                C: optC.trim(),
                D: optD.trim(),
              },
            };
          }
          return q;
        })
      );
      handleCancelEdit();
    } else {
      // Add new question
      if (questions.length >= 8) {
        setErrorMsg('Maximum recommended questions reached (8 questions).');
        return;
      }
      const newQ: Question = {
        id: 'q-' + Date.now(),
        questionNumber: questions.length + 1,
        text: questionText.trim(),
        isMCQ,
        options: {
          A: optA.trim(),
          B: optB.trim(),
          C: optC.trim(),
          D: optD.trim(),
        },
        marks: 10,
      };
      setQuestions(prev => [...prev, newQ]);
      setQuestionText('');
      setOptA('');
      setOptB('');
      setOptC('');
      setOptD('');
    }
  };

  const handleSavePaper = () => {
    if (questions.length === 0) {
      setErrorMsg('Please add at least one question to the exam paper.');
      return;
    }

    const updatedPaper: ExamPaper = {
      examName: examName.trim() || 'College Examination',
      subject: subject.trim() || 'Cyber Security',
      examDate: examDate.trim() || '06 October 2026',
      duration: duration.trim() || '3 Hours',
      totalMarks: totalMarks.trim() || '50',
      questions,
    };

    onSavePaper(updatedPaper);
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-6">
      {/* Header */}
      <div className="border-b border-[#E5E2DC] pb-6 mb-8 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
        <div>
          <span className="text-xs uppercase tracking-wider text-[#736B63] font-mono">Activity 01 · Authoring</span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1E1B18] mt-1">
            Create Question Paper
          </h2>
        </div>
        <p className="text-xs text-[#736B63]">
          Fill examination header details and configure 3 to 5 questions.
        </p>
      </div>

      {/* Part 1: Examination Details Form */}
      <div className="bg-white border border-[#E5E2DC] p-6 mb-8">
        <h3 className="font-serif text-lg font-bold text-[#1E1B18] mb-4 border-b border-[#F0ECE6] pb-2">
          Examination Metadata
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#665E55] font-semibold mb-1">
              Exam Name
            </label>
            <input
              type="text"
              value={examName}
              onChange={e => setExamName(e.target.value)}
              placeholder="e.g. College Examination"
              className="w-full bg-[#F9F8F6] border border-[#D5D0C7] focus:border-[#4A1521] focus:outline-none px-3 py-2 text-sm text-[#1E1B18]"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#665E55] font-semibold mb-1">
              Subject
            </label>
            <input
              type="text"
              value={subject}
              onChange={e => setSubject(e.target.value)}
              placeholder="e.g. Cyber Security"
              className="w-full bg-[#F9F8F6] border border-[#D5D0C7] focus:border-[#4A1521] focus:outline-none px-3 py-2 text-sm text-[#1E1B18]"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#665E55] font-semibold mb-1">
              Exam Date
            </label>
            <input
              type="text"
              value={examDate}
              onChange={e => setExamDate(e.target.value)}
              placeholder="e.g. 06 October 2026"
              className="w-full bg-[#F9F8F6] border border-[#D5D0C7] focus:border-[#4A1521] focus:outline-none px-3 py-2 text-sm text-[#1E1B18]"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#665E55] font-semibold mb-1">
              Duration
            </label>
            <input
              type="text"
              value={duration}
              onChange={e => setDuration(e.target.value)}
              placeholder="e.g. 3 Hours"
              className="w-full bg-[#F9F8F6] border border-[#D5D0C7] focus:border-[#4A1521] focus:outline-none px-3 py-2 text-sm text-[#1E1B18]"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#665E55] font-semibold mb-1">
              Total Marks
            </label>
            <input
              type="text"
              value={totalMarks}
              onChange={e => setTotalMarks(e.target.value)}
              placeholder="e.g. 50"
              className="w-full bg-[#F9F8F6] border border-[#D5D0C7] focus:border-[#4A1521] focus:outline-none px-3 py-2 text-sm text-[#1E1B18]"
            />
          </div>
        </div>
      </div>

      {/* Part 2: Question Input Box */}
      <div className="bg-white border border-[#E5E2DC] p-6 mb-8">
        <div className="flex items-center justify-between border-b border-[#F0ECE6] pb-3 mb-4">
          <h3 className="font-serif text-lg font-bold text-[#1E1B18]">
            {editingId ? 'Edit Question' : `Question ${questions.length + 1}`}
          </h3>
          <span className="text-xs text-[#736B63] font-mono">
            {questions.length} questions in paper
          </span>
        </div>

        <form onSubmit={handleAddOrUpdateQuestion} className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#665E55] font-semibold mb-1">
              Enter your question here...
            </label>
            <textarea
              rows={2}
              value={questionText}
              onChange={e => setQuestionText(e.target.value)}
              placeholder="e.g. What is the fundamental difference between symmetric and asymmetric encryption?"
              className="w-full bg-[#F9F8F6] border border-[#D5D0C7] focus:border-[#4A1521] focus:outline-none px-3 py-2 text-sm text-[#1E1B18]"
            />
          </div>

          {/* Multiple choice toggle */}
          <div className="flex items-center gap-2 pt-1 pb-1">
            <input
              type="checkbox"
              id="isMCQToggle"
              checked={isMCQ}
              onChange={e => setIsMCQ(e.target.checked)}
              className="accent-[#4A1521] w-4 h-4 cursor-pointer"
            />
            <label htmlFor="isMCQToggle" className="text-xs font-semibold text-[#5C554E] cursor-pointer">
              Multiple Choice Question (Include Options A, B, C, D)
            </label>
          </div>

          {/* Multiple Choice Options */}
          {isMCQ && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 bg-[#FAF9F7] p-4 border border-[#ECE8E1]">
              <div>
                <label className="block text-xs font-semibold text-[#4A1521] mb-1">A. Option A</label>
                <input
                  type="text"
                  value={optA}
                  onChange={e => setOptA(e.target.value)}
                  placeholder="Option A description"
                  className="w-full bg-white border border-[#D5D0C7] focus:border-[#4A1521] focus:outline-none px-3 py-1.5 text-xs text-[#1E1B18]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A1521] mb-1">B. Option B</label>
                <input
                  type="text"
                  value={optB}
                  onChange={e => setOptB(e.target.value)}
                  placeholder="Option B description"
                  className="w-full bg-white border border-[#D5D0C7] focus:border-[#4A1521] focus:outline-none px-3 py-1.5 text-xs text-[#1E1B18]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A1521] mb-1">C. Option C</label>
                <input
                  type="text"
                  value={optC}
                  onChange={e => setOptC(e.target.value)}
                  placeholder="Option C description"
                  className="w-full bg-white border border-[#D5D0C7] focus:border-[#4A1521] focus:outline-none px-3 py-1.5 text-xs text-[#1E1B18]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A1521] mb-1">D. Option D</label>
                <input
                  type="text"
                  value={optD}
                  onChange={e => setOptD(e.target.value)}
                  placeholder="Option D description"
                  className="w-full bg-white border border-[#D5D0C7] focus:border-[#4A1521] focus:outline-none px-3 py-1.5 text-xs text-[#1E1B18]"
                />
              </div>
            </div>
          )}

          {errorMsg && (
            <div className="text-xs text-[#991B1B] bg-[#FEF2F2] border border-[#FCA5A5] p-2.5 flex items-center gap-1.5">
              <span>⚠️</span>
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#1E1B18] hover:bg-[#332E2A] text-white text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer"
            >
              {editingId ? 'Update Question' : '+ Add Question'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="px-4 py-2 text-xs uppercase tracking-wider text-[#736B63] hover:text-[#1E1B18] cursor-pointer"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Part 3: Questions list with Edit | Delete */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-serif text-xl font-bold text-[#1E1B18]">
            Questions on Paper ({questions.length})
          </h3>
          <span className="text-xs text-[#736B63]">
            Target: 3–5 Questions
          </span>
        </div>

        <div className="space-y-3">
          {questions.map((q, idx) => (
            <div
              key={q.id}
              className={`bg-white border p-5 transition-colors ${
                editingId === q.id ? 'border-[#4A1521] ring-1 ring-[#4A1521]' : 'border-[#E5E2DC]'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="font-serif font-bold text-base text-[#1E1B18]">
                      {idx + 1}.
                    </span>
                    <p className="font-medium text-sm text-[#1E1B18] leading-relaxed">
                      {q.text}
                    </p>
                  </div>

                  {q.isMCQ && (
                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-xs text-[#5C554E] pl-5">
                      <div><strong className="text-[#4A1521]">A.</strong> {q.options.A}</div>
                      <div><strong className="text-[#4A1521]">B.</strong> {q.options.B}</div>
                      <div><strong className="text-[#4A1521]">C.</strong> {q.options.C}</div>
                      <div><strong className="text-[#4A1521]">D.</strong> {q.options.D}</div>
                    </div>
                  )}
                </div>

                {/* Edit | Delete */}
                <div className="flex items-center gap-2 text-xs border-l border-[#E5E2DC] pl-4 shrink-0">
                  <button
                    onClick={() => handleStartEdit(q)}
                    className="text-[#4A1521] hover:underline font-semibold cursor-pointer"
                  >
                    Edit
                  </button>
                  <span className="text-[#CCC]">|</span>
                  <button
                    onClick={() => handleDelete(q.id)}
                    className="text-[#991B1B] hover:underline font-semibold cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Part 4: Bottom Action: SAVE QUESTION PAPER */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-white border border-[#E5E2DC]">
        <div>
          <h4 className="font-serif text-lg font-bold text-[#1E1B18]">Ready to finalize paper layout?</h4>
          <p className="text-xs text-[#736B63] mt-0.5">
            Proceed to the official examination preview before applying cryptographic security.
          </p>
        </div>
        <button
          onClick={handleSavePaper}
          className="w-full sm:w-auto px-8 py-3.5 bg-[#4A1521] hover:bg-[#380F18] text-white text-xs uppercase tracking-widest font-semibold transition-colors cursor-pointer"
        >
          SAVE QUESTION PAPER
        </button>
      </div>
    </div>
  );
};
