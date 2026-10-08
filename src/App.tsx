/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ExamPaper, TabType } from './types';
import { initialExamPaper } from './data/defaultPaper';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { CreatePaper } from './components/CreatePaper';
import { PreviewPaper } from './components/PreviewPaper';
import { EncryptionActivity } from './components/EncryptionActivity';
import { IntegrityActivity } from './components/IntegrityActivity';
import { FinalSecurityPage } from './components/FinalSecurityPage';

const STORAGE_KEY = 'secure_exam_paper_data';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('home');
  const [paper, setPaper] = useState<ExamPaper>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }
    return initialExamPaper;
  });

  const [isPaperSaved, setIsPaperSaved] = useState<boolean>(true);
  const [isEncrypted, setIsEncrypted] = useState<boolean>(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(paper));
    } catch {
      // ignore
    }
  }, [paper]);

  // Handler when user saves paper in CreatePaper
  const handleSavePaper = (updatedPaper: ExamPaper) => {
    setPaper(updatedPaper);
    setIsPaperSaved(true);
    setCurrentTab('preview');
  };

  const handleStartAgain = () => {
    setCurrentTab('home');
  };

  const handleResetToDefault = () => {
    setPaper(initialExamPaper);
    setIsPaperSaved(true);
    setIsEncrypted(false);
    setCurrentTab('create');
  };

  return (
    <div className="min-h-screen bg-[#F9F8F6] text-[#1E1B18] flex flex-col font-sans selection:bg-[#4A1521] selection:text-white">
      {/* Top Navigation */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={(tab) => {
          if (tab === 'create' && isPaperSaved && currentTab !== 'create') {
            setCurrentTab('create');
          } else {
            setCurrentTab(tab);
          }
        }}
        isPaperCreated={isPaperSaved}
        isEncrypted={isEncrypted}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <HomePage onStart={() => setCurrentTab('create')} />
        )}

        {currentTab === 'create' && (
          <CreatePaper
            paper={paper}
            onSavePaper={handleSavePaper}
          />
        )}

        {currentTab === 'preview' && (
          <PreviewPaper
            paper={paper}
            onProceedToSecure={() => {
              setIsEncrypted(true);
              setCurrentTab('encrypt');
            }}
            onBackToEdit={() => setCurrentTab('create')}
          />
        )}

        {currentTab === 'encrypt' && (
          <EncryptionActivity
            paper={paper}
            onProceedToIntegrity={() => setCurrentTab('integrity')}
            onBackToPreview={() => setCurrentTab('preview')}
          />
        )}

        {currentTab === 'integrity' && (
          <IntegrityActivity
            paper={paper}
            onProceedToFinal={() => setCurrentTab('final')}
            onBackToEncrypt={() => setCurrentTab('encrypt')}
          />
        )}

        {currentTab === 'final' && (
          <FinalSecurityPage
            paper={paper}
            onStartAgain={handleStartAgain}
            onViewPaper={() => setCurrentTab('preview')}
          />
        )}
      </main>

      {/* Clean Editorial Footer */}
      <footer className="border-t border-[#E5E2DC] bg-[#F9F8F6] py-6 px-6 text-xs text-[#736B63] mt-auto">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-[#1E1B18]">SECURE EXAM QUESTION PAPER</span>
            <span aria-hidden="true">·</span>
            <span>College Cyber Security Project</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>Confidentiality (Encryption)</span>
            <span aria-hidden="true">·</span>
            <span>Integrity (SHA-256 Hashing)</span>
            <span aria-hidden="true">·</span>
            <button
              onClick={handleResetToDefault}
              className="text-[#4A1521] hover:underline font-semibold cursor-pointer"
            >
              Reset Sample Paper
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
