import React from 'react';
import { ExamPaper } from '../types';

interface FinalSecurityPageProps {
  paper: ExamPaper;
  onStartAgain: () => void;
  onViewPaper: () => void;
}

export const FinalSecurityPage: React.FC<FinalSecurityPageProps> = ({
  paper,
  onStartAgain,
  onViewPaper,
}) => {
  return (
    <div className="max-w-4xl mx-auto py-12 md:py-16 px-6">
      {/* College Project Badge */}
      <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-[#736B63] mb-6">
        <span>Verification Complete</span>
        <span aria-hidden="true">·</span>
        <span>Cryptographic Audit Passed</span>
        <span aria-hidden="true">·</span>
        <span>Academic Examination Ready</span>
      </div>

      {/* Main Header */}
      <div className="border-b border-[#E5E2DC] pb-8 mb-10">
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#1E1B18] tracking-tight mb-4">
          🔐 SECURITY CHECK COMPLETE
        </h1>
        <p className="font-serif text-xl sm:text-2xl text-[#4A1521] italic leading-relaxed">
          Both confidentiality protection and cryptographic integrity verification have succeeded.
        </p>
      </div>

      {/* The 3 Required Results */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* Result 1: Encryption */}
        <div className="bg-white border border-[#E5E2DC] p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🔐</span>
              <h3 className="font-serif text-xl font-bold text-[#1E1B18]">Encryption</h3>
            </div>
            <p className="text-base font-semibold text-[#4A1521] mb-2">
              Question paper protected
            </p>
            <p className="text-xs text-[#665E55] leading-relaxed">
              Plaintext questions transformed into encrypted ciphertext to prevent unauthorized access.
            </p>
          </div>
          <div className="mt-6 pt-3 border-t border-[#F0ECE6] text-xs font-mono text-[#736B63]">
            Status: PROTECTED
          </div>
        </div>

        {/* Result 2: Integrity */}
        <div className="bg-white border border-[#E5E2DC] p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🛡️</span>
              <h3 className="font-serif text-xl font-bold text-[#1E1B18]">Integrity</h3>
            </div>
            <p className="text-base font-semibold text-[#4A1521] mb-2">
              Question paper verified
            </p>
            <p className="text-xs text-[#665E55] leading-relaxed">
              Cryptographic SHA-256 fingerprint verified. Any tampering or unauthorized alterations are detected.
            </p>
          </div>
          <div className="mt-6 pt-3 border-t border-[#F0ECE6] text-xs font-mono text-[#736B63]">
            Status: VERIFIED
          </div>
        </div>

        {/* Result 3: Security Status */}
        <div className="bg-white border-2 border-[#166534] p-6 flex flex-col justify-between bg-[#F0FDF4]/30">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">✅</span>
              <h3 className="font-serif text-xl font-bold text-[#1E1B18]">Security Status</h3>
            </div>
            <p className="text-2xl font-bold text-[#166534] tracking-wide mb-2">
              SECURE
            </p>
            <p className="text-xs text-[#166534] leading-relaxed">
              Full compliance with confidentiality and integrity requirements for college examination papers.
            </p>
          </div>
          <div className="mt-6 pt-3 border-t border-[#BBF7D0] text-xs font-mono text-[#15803D] font-bold">
            All Invariants Passed ✓
          </div>
        </div>
      </div>

      {/* Cyber Security Concepts Summary Box */}
      <div className="bg-white border border-[#E5E2DC] p-6 mb-10">
        <h4 className="font-serif text-lg font-bold text-[#1E1B18] mb-3 border-b border-[#F0ECE6] pb-2">
          Project Learning Summary · Core Principles
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[#554E46]">
          <div className="bg-[#FAF9F7] p-3 border border-[#ECE8E1]">
            <strong className="text-[#4A1521] block mb-1 font-sans text-sm">1. Encryption</strong>
            Protects the question paper by converting readable text into unreadable ciphertext.
          </div>
          <div className="bg-[#FAF9F7] p-3 border border-[#ECE8E1]">
            <strong className="text-[#4A1521] block mb-1 font-sans text-sm">2. Hashing</strong>
            Generates a unique fixed-length digital fingerprint that instantly detects changes.
          </div>
          <div className="bg-[#FAF9F7] p-3 border border-[#ECE8E1]">
            <strong className="text-[#4A1521] block mb-1 font-sans text-sm">3. Integrity Verification</strong>
            Confirms that the paper remains identical to the original version authorized by faculty.
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-white border border-[#E5E2DC]">
        <div>
          <h4 className="font-serif text-lg font-bold text-[#1E1B18]">Demonstration Completed</h4>
          <p className="text-xs text-[#736B63] mt-0.5">
            Subject: {paper.subject} · {paper.questions.length} questions evaluated.
          </p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={onViewPaper}
            className="flex-1 sm:flex-none px-6 py-3.5 border border-[#1E1B18] hover:bg-[#FAF9F7] text-[#1E1B18] text-xs uppercase tracking-widest font-semibold transition-colors cursor-pointer text-center"
          >
            Review Paper
          </button>
          <button
            onClick={onStartAgain}
            className="flex-1 sm:flex-none px-8 py-3.5 bg-[#4A1521] hover:bg-[#380F18] text-white text-xs uppercase tracking-widest font-semibold transition-colors cursor-pointer text-center"
          >
            START AGAIN
          </button>
        </div>
      </div>
    </div>
  );
};
