import React from 'react';
import { TabType } from '../types';

interface NavbarProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  isPaperCreated: boolean;
  isEncrypted: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  isPaperCreated,
  isEncrypted,
}) => {
  return (
    <header className="border-b border-[#E5E2DC] bg-[#F9F8F6] sticky top-0 z-40">
      <div className="max-w-5xl mx-auto px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Brand / Title */}
        <div className="cursor-pointer" onClick={() => onSelectTab('home')}>
          <div className="flex items-center gap-2">
            <span className="text-xl">🔐</span>
            <h1 className="font-serif text-2xl md:text-3xl font-bold tracking-tight text-[#1E1B18]">
              SECURE EXAM QUESTION PAPER
            </h1>
          </div>
          <p className="text-xs uppercase tracking-widest text-[#4A1521] font-semibold mt-0.5">
            Protect Your Question Paper Using Cryptography
          </p>
        </div>

        {/* Navigation items: Home | Create Paper | Secure Paper | Integrity Check */}
        <nav className="flex items-center gap-1 sm:gap-2 flex-wrap text-sm border-t md:border-t-0 pt-2 md:pt-0 border-[#E5E2DC]">
          <button
            onClick={() => onSelectTab('home')}
            className={`px-3 py-1.5 transition-colors border-b-2 font-medium ${
              currentTab === 'home'
                ? 'border-[#4A1521] text-[#4A1521] font-semibold'
                : 'border-transparent text-[#5C554E] hover:text-[#1E1B18] hover:border-[#CDC7BD]'
            }`}
          >
            Home
          </button>

          <span className="text-[#D3CECE] select-none">|</span>

          <button
            onClick={() => onSelectTab('create')}
            className={`px-3 py-1.5 transition-colors border-b-2 font-medium ${
              currentTab === 'create' || currentTab === 'preview'
                ? 'border-[#4A1521] text-[#4A1521] font-semibold'
                : 'border-transparent text-[#5C554E] hover:text-[#1E1B18] hover:border-[#CDC7BD]'
            }`}
          >
            Create Paper
          </button>

          <span className="text-[#D3CECE] select-none">|</span>

          <button
            onClick={() => onSelectTab('encrypt')}
            className={`px-3 py-1.5 transition-colors border-b-2 font-medium ${
              currentTab === 'encrypt'
                ? 'border-[#4A1521] text-[#4A1521] font-semibold'
                : 'border-transparent text-[#5C554E] hover:text-[#1E1B18] hover:border-[#CDC7BD]'
            }`}
          >
            Secure Paper
          </button>

          <span className="text-[#D3CECE] select-none">|</span>

          <button
            onClick={() => onSelectTab('integrity')}
            className={`px-3 py-1.5 transition-colors border-b-2 font-medium ${
              currentTab === 'integrity' || currentTab === 'final'
                ? 'border-[#4A1521] text-[#4A1521] font-semibold'
                : 'border-transparent text-[#5C554E] hover:text-[#1E1B18] hover:border-[#CDC7BD]'
            }`}
          >
            Integrity Check
          </button>
        </nav>
      </div>
    </header>
  );
};
