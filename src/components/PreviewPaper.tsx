import React from 'react';
import { ExamPaper } from '../types';

interface PreviewPaperProps {
  paper: ExamPaper;
  onProceedToSecure: () => void;
  onBackToEdit: () => void;
}

export const PreviewPaper: React.FC<PreviewPaperProps> = ({
  paper,
  onProceedToSecure,
  onBackToEdit,
}) => {
  return (
    <div className="max-w-4xl mx-auto py-10 px-6">
      {/* Top Header */}
      <div className="border-b border-[#E5E2DC] pb-6 mb-8 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
        <div>
          <span className="text-xs uppercase tracking-wider text-[#736B63] font-mono">
            Preview · Examination Document
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1E1B18] mt-1">
            Question Paper Preview
          </h2>
        </div>
        <button
          onClick={onBackToEdit}
          className="text-xs font-semibold text-[#4A1521] hover:underline flex items-center gap-1 cursor-pointer"
        >
          <span>←</span>
          <span>Edit Questions</span>
        </button>
      </div>

      {/* College Examination Paper Sheet */}
      <div className="bg-white border border-[#E5E2DC] p-8 md:p-12 mb-8 shadow-xs">
        {/* Paper Header */}
        <div className="text-center border-b-2 border-dashed border-[#1E1B18] pb-6 mb-6">
          <div className="text-xs uppercase tracking-widest text-[#736B63] font-mono mb-1">
            CONFIDENTIAL ACADEMIC ASSESSMENT
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#1E1B18] tracking-tight uppercase">
            {paper.examName || 'COLLEGE EXAMINATION'}
          </h1>
          <div className="text-sm font-serif italic text-[#4A1521] mt-1">
            Department of Computer Science &amp; Engineering
          </div>
        </div>

        {/* Paper Metadata Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-3 border-b border-[#E5E2DC] text-xs mb-8 bg-[#FAF9F7] px-4">
          <div>
            <span className="text-[#736B63] uppercase tracking-wider block font-medium">Subject</span>
            <strong className="text-[#1E1B18] font-semibold text-sm">{paper.subject}</strong>
          </div>
          <div>
            <span className="text-[#736B63] uppercase tracking-wider block font-medium">Date</span>
            <strong className="text-[#1E1B18] font-semibold text-sm">{paper.examDate}</strong>
          </div>
          <div>
            <span className="text-[#736B63] uppercase tracking-wider block font-medium">Duration</span>
            <strong className="text-[#1E1B18] font-semibold text-sm">{paper.duration}</strong>
          </div>
          <div>
            <span className="text-[#736B63] uppercase tracking-wider block font-medium">Max Marks</span>
            <strong className="text-[#1E1B18] font-semibold text-sm">{paper.totalMarks}</strong>
          </div>
        </div>

        {/* Instructions */}
        <div className="text-xs text-[#736B63] italic mb-8 pb-3 border-b border-[#F0ECE6]">
          Instructions: Answer all questions carefully. All questions carry equal marks. Unauthorized possession of this document is strictly prohibited.
        </div>

        {/* Questions Section */}
        <div className="space-y-6">
          {paper.questions.map((q, idx) => (
            <div key={q.id} className="pb-4 border-b border-[#F5F2EC] last:border-0">
              <div className="flex items-baseline justify-between gap-2 mb-2">
                <div className="flex items-baseline gap-2">
                  <span className="font-serif font-bold text-lg text-[#1E1B18]">
                    {idx + 1}.
                  </span>
                  <span className="font-medium text-base text-[#1E1B18] leading-relaxed">
                    {q.text}
                  </span>
                </div>
                <span className="text-xs text-[#736B63] font-mono shrink-0">
                  [{q.marks || 10} Marks]
                </span>
              </div>

              {q.isMCQ && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-3 pl-6 text-sm text-[#403B35]">
                  <div>
                    <span className="font-bold text-[#4A1521] mr-1.5">A.</span>
                    {q.options.A}
                  </div>
                  <div>
                    <span className="font-bold text-[#4A1521] mr-1.5">B.</span>
                    {q.options.B}
                  </div>
                  <div>
                    <span className="font-bold text-[#4A1521] mr-1.5">C.</span>
                    {q.options.C}
                  </div>
                  <div>
                    <span className="font-bold text-[#4A1521] mr-1.5">D.</span>
                    {q.options.D}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom divider line */}
        <div className="border-t-2 border-dashed border-[#1E1B18] mt-10 pt-4 text-center text-xs uppercase tracking-widest text-[#736B63] font-mono">
          *** END OF QUESTION PAPER ***
        </div>
      </div>

      {/* Action to proceed to encryption */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-white border border-[#E5E2DC]">
        <div>
          <h4 className="font-serif text-lg font-bold text-[#1E1B18]">Protect Confidentiality</h4>
          <p className="text-xs text-[#736B63] mt-0.5">
            Convert this plaintext question paper into encrypted ciphertext.
          </p>
        </div>
        <button
          onClick={onProceedToSecure}
          className="w-full sm:w-auto px-8 py-3.5 bg-[#4A1521] hover:bg-[#380F18] text-white text-xs uppercase tracking-widest font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>🔐</span>
          <span>SECURE QUESTION PAPER</span>
        </button>
      </div>
    </div>
  );
};
