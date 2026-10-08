import React, { useState, useEffect } from 'react';
import { ExamPaper } from '../types';
import { encryptTextAES } from '../utils/crypto';

interface EncryptionActivityProps {
  paper: ExamPaper;
  onProceedToIntegrity: () => void;
  onBackToPreview: () => void;
}

export const EncryptionActivity: React.FC<EncryptionActivityProps> = ({
  paper,
  onProceedToIntegrity,
  onBackToPreview,
}) => {
  const [encryptionState, setEncryptionState] = useState<'idle' | 'encrypting' | 'encrypted'>('idle');
  const [ciphertext, setCiphertext] = useState<string>('');

  const handleStartEncryption = async () => {
    setEncryptionState('encrypting');

    // Generate real AES ciphertext representation from paper
    const plaintext = paper.questions.map((q, i) => `${i + 1}. ${q.text}`).join('\n');
    const encrypted = await encryptTextAES(plaintext);

    // Realistic brief animation
    setTimeout(() => {
      setCiphertext(encrypted);
      setEncryptionState('encrypted');
    }, 1200);
  };

  // Auto-trigger if arriving fresh
  useEffect(() => {
    if (encryptionState === 'idle') {
      handleStartEncryption();
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-10 px-6">
      {/* Top Header */}
      <div className="border-b border-[#E5E2DC] pb-6 mb-8 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
        <div>
          <span className="text-xs uppercase tracking-wider text-[#736B63] font-mono">
            Activity 02 · Cryptography
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1E1B18] mt-1">
            Encrypt Question Paper
          </h2>
        </div>
        <button
          onClick={onBackToPreview}
          className="text-xs font-semibold text-[#4A1521] hover:underline flex items-center gap-1 cursor-pointer"
        >
          <span>←</span>
          <span>View Plain Paper</span>
        </button>
      </div>

      {/* Main Grid: Before vs After */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Left Column: Before Encryption */}
        <div className="bg-white border border-[#E5E2DC] p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#F0ECE6]">
              <h3 className="font-serif text-xl font-bold text-[#1E1B18]">
                Before Encryption
              </h3>
              <span className="text-xs font-mono text-[#736B63] uppercase">Plaintext</span>
            </div>

            <div className="text-xs font-semibold uppercase text-[#736B63] tracking-wider mb-2">
              Question Paper
            </div>

            <div className="bg-[#FAF9F7] border border-[#ECE8E1] p-4 font-serif text-sm text-[#1E1B18] space-y-3 leading-relaxed">
              {paper.questions.map((q, idx) => (
                <div key={q.id}>
                  <span className="font-bold mr-1.5">{idx + 1}.</span>
                  <span>{q.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#F0ECE6] text-xs text-[#736B63]">
            Status: Readable by anyone with physical or digital access.
          </div>
        </div>

        {/* Right Column: Encrypting / Encrypted */}
        <div className="bg-white border border-[#E5E2DC] p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#F0ECE6]">
              <h3 className="font-serif text-xl font-bold text-[#1E1B18]">
                {encryptionState === 'encrypted' ? '🔐 Question Paper Encrypted' : 'Encryption State'}
              </h3>
              <span className="text-xs font-mono text-[#4A1521] uppercase">
                {encryptionState === 'encrypted' ? 'Ciphertext' : 'Processing'}
              </span>
            </div>

            {encryptionState === 'encrypting' && (
              <div className="py-12 text-center">
                <div className="inline-block animate-spin text-3xl mb-3">⚙️</div>
                <h4 className="font-serif text-lg font-bold text-[#1E1B18]">
                  Encrypting Question Paper...
                </h4>
                <p className="text-xs text-[#736B63] mt-2">
                  Applying symmetric AES cryptographic cipher to all question data...
                </p>
              </div>
            )}

            {encryptionState === 'encrypted' && (
              <div>
                <div className="text-xs font-semibold uppercase text-[#4A1521] tracking-wider mb-2 flex items-center justify-between">
                  <span>Protected Cipher Output</span>
                  <span className="text-[#736B63] font-mono text-[11px]">AES-256</span>
                </div>

                {/* Encrypted text display as requested: X7K9P2L8Q4M1... */}
                <div className="bg-[#1E1B18] text-[#F9F8F6] p-4 border border-[#1E1B18] font-mono text-xs break-all leading-relaxed select-all">
                  <div className="text-[#A3E635] text-[11px] mb-1 font-sans">
                    // Encrypted stream representation:
                  </div>
                  <div className="text-sm font-bold tracking-wider text-white mb-2">
                    X7K9P2L8Q4M1{ciphertext.slice(12, 48)}...
                  </div>
                  <div className="text-[11px] text-[#A8A29E] border-t border-[#38332E] pt-2">
                    Full Cipher: {ciphertext.slice(0, 96)}...
                  </div>
                </div>

                {/* Explanation */}
                <div className="mt-4 p-3.5 bg-[#F4ECEE] border border-[#E3D0D5]">
                  <p className="text-xs text-[#4A1521] font-medium leading-relaxed">
                    <strong>Encryption converts the readable question paper into protected data so that unauthorized people cannot easily read it.</strong>
                  </p>
                </div>
              </div>
            )}

            {encryptionState === 'idle' && (
              <div className="py-12 text-center">
                <button
                  onClick={handleStartEncryption}
                  className="px-6 py-3 bg-[#4A1521] text-white text-xs font-semibold uppercase tracking-wider cursor-pointer"
                >
                  Start Encryption
                </button>
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-[#F0ECE6] flex items-center justify-between text-xs">
            <span className="text-[#736B63]">
              {encryptionState === 'encrypted' ? 'Confidentiality: Active' : 'Waiting...'}
            </span>
            {encryptionState === 'encrypted' && (
              <button
                onClick={handleStartEncryption}
                className="text-[#4A1521] hover:underline font-semibold cursor-pointer"
              >
                Re-encrypt
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Next Step Action */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-white border border-[#E5E2DC]">
        <div>
          <h4 className="font-serif text-lg font-bold text-[#1E1B18]">Next: Integrity Verification</h4>
          <p className="text-xs text-[#736B63] mt-0.5">
            Encryption protects confidentiality; now verify integrity using cryptographic hashing.
          </p>
        </div>
        <button
          onClick={onProceedToIntegrity}
          className="w-full sm:w-auto px-8 py-3.5 bg-[#4A1521] hover:bg-[#380F18] text-white text-xs uppercase tracking-widest font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>🛡️</span>
          <span>CHECK PAPER INTEGRITY</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
};
