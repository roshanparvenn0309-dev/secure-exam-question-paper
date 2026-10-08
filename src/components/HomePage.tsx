import React from 'react';

interface HomePageProps {
  onStart: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onStart }) => {
  return (
    <div className="max-w-4xl mx-auto py-12 md:py-20 px-6">
      {/* College Project Badge / Kicker */}
      <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-[#736B63] mb-6">
        <span>B.Tech / B.Sc Project</span>
        <span aria-hidden="true">·</span>
        <span>Cyber Security &amp; Cryptography</span>
        <span aria-hidden="true">·</span>
        <span>Academic Demonstration</span>
      </div>

      {/* Main Heading & Subtitle */}
      <div className="border-b border-[#E5E2DC] pb-10 mb-10">
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#1E1B18] leading-[1.15] mb-6 font-bold">
          🔐 Secure Exam Question Paper
        </h1>
        <p className="font-serif text-2xl md:text-3xl text-[#4A1521] italic font-medium leading-snug mb-6">
          Protect your examination question paper using encryption and hashing.
        </p>
        <p className="text-base sm:text-lg text-[#554E46] leading-relaxed max-w-2xl">
          “This website demonstrates how cryptography can be used to protect a question paper from unauthorized viewing and detect unwanted changes.”
        </p>
      </div>

      {/* 3 Core Activities Editorial Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white border border-[#E5E2DC] p-6 flex flex-col justify-between">
          <div>
            <span className="text-xs uppercase tracking-wider text-[#8A8177] font-mono">Activity 01</span>
            <div className="flex items-center gap-2 mt-2 mb-3">
              <span className="text-2xl">📄</span>
              <h3 className="font-serif text-xl font-bold text-[#1E1B18]">Create Paper</h3>
            </div>
            <p className="text-sm text-[#665E55] leading-relaxed">
              Draft official examination details and format multiple-choice and descriptive questions.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[#F0ECE6] text-xs font-medium text-[#4A1521]">
            Step 1 · Plaintext Input
          </div>
        </div>

        <div className="bg-white border border-[#E5E2DC] p-6 flex flex-col justify-between">
          <div>
            <span className="text-xs uppercase tracking-wider text-[#8A8177] font-mono">Activity 02</span>
            <div className="flex items-center gap-2 mt-2 mb-3">
              <span className="text-2xl">🔐</span>
              <h3 className="font-serif text-xl font-bold text-[#1E1B18]">Encrypt Paper</h3>
            </div>
            <p className="text-sm text-[#665E55] leading-relaxed">
              Transforms confidential question text into cipher text so unauthorized eyes cannot read it.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[#F0ECE6] text-xs font-medium text-[#4A1521]">
            Step 2 · Confidentiality
          </div>
        </div>

        <div className="bg-white border border-[#E5E2DC] p-6 flex flex-col justify-between">
          <div>
            <span className="text-xs uppercase tracking-wider text-[#8A8177] font-mono">Activity 03</span>
            <div className="flex items-center gap-2 mt-2 mb-3">
              <span className="text-2xl">🛡️</span>
              <h3 className="font-serif text-xl font-bold text-[#1E1B18]">Check Integrity</h3>
            </div>
            <p className="text-sm text-[#665E55] leading-relaxed">
              Generates a cryptographic hash and simulates tampering to verify if any question was modified.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[#F0ECE6] text-xs font-medium text-[#4A1521]">
            Step 3 · Hash Verification
          </div>
        </div>
      </div>

      {/* START Action Button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 bg-white border border-[#E5E2DC]">
        <div>
          <h4 className="font-serif text-lg font-bold text-[#1E1B18]">Ready to begin the demonstration?</h4>
          <p className="text-xs text-[#736B63] mt-0.5">
            Start by creating or reviewing the sample exam question paper.
          </p>
        </div>
        <button
          onClick={onStart}
          className="w-full sm:w-auto px-8 py-3.5 bg-[#4A1521] hover:bg-[#380F18] text-white text-sm font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>START</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
};
